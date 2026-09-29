import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { databaseChatTool, movieDatabaseTool, dadJokesTool } from '@/lib/tools';
import { getDatabase } from '@/lib/mongodb';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const db = await getDatabase();

  // Save the latest user message to MongoDB conversation history
  const lastUserMsg = messages[messages.length - 1];
  if (lastUserMsg && lastUserMsg.role === 'user') {
    await db.collection('conversations').insertOne({
      role: 'user',
      content: lastUserMsg.content,
      createdAt: new Date()
    });
  }

  const result = streamText({
    model: openai('gpt-4o'),
    system: `You are an AI learning assistant. Use your tools to query the MongoDB database, fetch movie data from OMDb, or tell dad jokes based on student requests.`,
    messages,
    tools: {
      databaseChatTool,
      movieDatabaseTool,
      dadJokesTool,
    },
    onFinish: async (event) => {
      // Save assistant response to MongoDB
      await db.collection('conversations').insertOne({
        role: 'assistant',
        content: event.text,
        createdAt: new Date()
      });
    }
  });

  return result.toDataStreamResponse();
}