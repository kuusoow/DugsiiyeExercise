import { tool } from 'ai';
import { z } from 'zod';
import { getDatabase } from './mongodb';

// ----------------------------------------------------
// PART 1: Database Chat Tool (Direct MongoDB Queries)
// ----------------------------------------------------
export const databaseChatTool = tool({
  description: 'Converts student queries into direct MongoDB collection operations for movies, users, and reviews.',
  parameters: z.object({
    action: z.enum(['GET_SCI_FI', 'USERS_OVER_AGE', 'HIGH_RATED_MOVIES', 'GENRE_COUNT']),
    minAge: z.number().optional().default(25),
    minRating: z.number().optional().default(8.5),
  }),
  execute: async (params: { action: string; minAge?: number; minRating?: number }) => {
    const { action, minAge = 25, minRating = 8.5 } = params;
    const db = await getDatabase();

    try {
      if (action === 'GET_SCI_FI') {
        // Find movies where genre contains "Sci-Fi"
        const movies = await db.collection('movies')
          .find({ genre: { $regex: 'Sci-Fi',$options: 'i' } })
          .limit(10)
          .toArray();
        return { success: true, count: movies.length, data: movies };
      }

      if (action === 'USERS_OVER_AGE') {
        // Find users older than minAge
        const users = await db.collection('users')
          .find({ age: { $gt: minAge } })
          .limit(10)
          .toArray();
        return { success: true, count: users.length, data: users };
      }

      if (action === 'HIGH_RATED_MOVIES') {
        // Find movies with rating greater than minRating
        const topMovies = await db.collection('movies')
          .find({ rating: { $gt: minRating } })
          .sort({ rating: -1 })
          .limit(10)
          .toArray();
        return { success: true, count: topMovies.length, data: topMovies };
      }

      if (action === 'GENRE_COUNT') {
        // Count total movies grouped by genre using MongoDB Aggregation
        const genreCounts = await db.collection('movies').aggregate([
          { $group: { _id: '$genre', totalMovies: { $sum: 1 } } },           {$sort: { totalMovies: -1 } }
        ]).toArray();
        return { success: true, data: genreCounts };
      }

      return { success: false, error: 'Invalid action' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
});


export const movieDatabaseTool = tool({
  description: 'Searches OMDb API for movie details, caches them in MongoDB, and suggests recommendations.',
  parameters: z.object({
    title: z.string().describe('Movie title to search for'),
    year: z.number().optional().describe('Optional release year'),
  }),
  execute: async ({ title, year }) => {
    const db = await getDatabase();
    const cacheKey = `${title.toLowerCase()}_${year || 'any'}`;

    try {
      
      const cachedMovie = await db.collection('movie_cache').findOne({ cacheKey });
      if (cachedMovie) {
        return { success: true, source: 'MongoDB Cache', movie: cachedMovie.data };
      }

      const apiKey = process.env.OMDB_API_KEY;
      const response = await fetch(
        `http://www.omdbapi.com/?t=${encodeURIComponent(title)}${year ? `&y=${year}` : ''}&apikey=${apiKey}`
      );
      const data = await response.json();

      if (data.Response === 'False') {
     
        const localMatch = await db.collection('movies').findOne({
          title: { $regex: title,$options: 'i' }
        });
        if (localMatch) {
          return { success: true, source: 'Local DB Fallback', movie: localMatch };
        }
        return { success: false, error: data.Error || 'Movie not found' };
      }

      const formattedMovie = {
        title: data.Title,
        year: data.Year,
        genre: data.Genre,
        rating: data.imdbRating,
        director: data.Director,
        plot: data.Plot,
        poster: data.Poster !== 'N/A' ? data.Poster : null,
        cast: data.Actors,
      };

      
      await db.collection('movie_cache').updateOne(
        { cacheKey },
        { $set: { cacheKey, data: formattedMovie, createdAt: new Date() } },
        { upsert: true }
      );

     
      const primaryGenre = data.Genre.split(',')[0].trim();
      const recommendations = await db.collection('movies')
        .find({ genre: { $regex: primaryGenre, $options: 'i' }, title: {$ne: data.Title } })
        .limit(3)
        .toArray();

      return {
        success: true,
        source: 'OMDb API',
        movie: formattedMovie,
        recommendations
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
});


export const dadJokesTool = tool({
  description: 'Fetches random dad jokes from API, stores them in MongoDB, and supports keyword search.',
  parameters: z.object({
    mode: z.enum(['random', 'search']),
    keyword: z.string().optional().describe('Keyword to search local jokes'),
  }),
  execute: async ({ mode, keyword }) => {
    const db = await getDatabase();

    try {
      if (mode === 'search' && keyword) {
        // Search jokes saved in MongoDB
        const foundJokes = await db.collection('jokes')
          .find({ joke: { $regex: keyword,$options: 'i' } })
          .limit(5)
          .toArray();
        return { success: true, mode: 'search', jokes: foundJokes };
      }

      const response = await fetch('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json', 'User-Agent': 'Student-App' }
      });

      if (!response.ok) {
        throw new Error('Joke API unreachable');
      }

      const jokeData = await response.json();


      await db.collection('jokes').updateOne(
        { jokeId: jokeData.id },
        { $set: { jokeId: jokeData.id, joke: jokeData.joke, savedAt: new Date() } },
        { upsert: true }
      );

      return { success: true, mode: 'random', joke: jokeData.joke, jokeId: jokeData.id };
    } catch (error: any) {
      
      const localJokes = await db.collection('jokes').aggregate([{ $sample: { size: 1 } }]).toArray();
      if (localJokes.length > 0) {
        return { success: true, mode: 'offline_fallback', joke: localJokes[0].joke };
      }
      return { success: false, error: 'Could not retrieve joke online or offline.' };
    }
  },
});