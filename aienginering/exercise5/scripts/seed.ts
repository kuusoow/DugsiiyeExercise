import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai_studio_db';

async function seed() {
  console.log('🌱 Seeding MongoDB database...');
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db();

  // 1. Seed Movies
  await db.collection('movies').deleteMany({});
  await db.collection('movies').insertMany([
    { title: 'Interstellar', year: 2014, genre: 'Sci-Fi', rating: 8.7, director: 'Christopher Nolan', description: 'A team of explorers travel through a wormhole in space.' },
    { title: 'The Matrix', year: 1999, genre: 'Sci-Fi', rating: 8.7, director: 'Lana & Lilly Wachowski', description: 'A computer hacker learns about the true nature of reality.' },
    { title: 'Inception', year: 2010, genre: 'Sci-Fi', rating: 8.8, director: 'Christopher Nolan', description: 'A thief enters the dreams of others to steal secrets.' },
    { title: 'The Godfather', year: 1972, genre: 'Crime', rating: 9.2, director: 'Francis Ford Coppola', description: 'The aging patriarch of an organized crime dynasty transfers control.' }
  ]);

  // 2. Seed Users
  await db.collection('users').deleteMany({});
  await db.collection('users').insertMany([
    { name: 'Alice Smith', email: 'alice@example.com', age: 28, favoriteGenre: 'Sci-Fi' },
    { name: 'Bob Jones', email: 'bob@example.com', age: 34, favoriteGenre: 'Action' },
    { name: 'Charlie Brown', email: 'charlie@example.com', age: 21, favoriteGenre: 'Comedy' }
  ]);

  console.log('✅ Seeding complete!');
  await client.close();
}

seed().catch(console.error);