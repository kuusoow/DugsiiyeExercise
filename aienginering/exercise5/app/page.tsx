'use client';

import { useChat } from 'ai/react';

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, setMessages, isLoading } = useChat();

  return (
    <main className="max-w-4xl mx-auto p-6 font-sans">
      <header className="flex justify-between items-center pb-4 border-b">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">🍃 Student AI Studio</h1>
          <p className="text-sm text-gray-500">MongoDB + Next.js + AI SDK Tools</p>
        </div>
        <button
          onClick={() => setMessages([])}
          className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded text-gray-700"
        >
          Clear Chat
        </button>
      </header>

      {/* Chat Messages Window */}
      <div className="my-6 space-y-4 min-h-[400px]">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-4 rounded-lg border ${
              m.role === 'user' ? 'bg-blue-50 border-blue-200 ml-12' : 'bg-white border-gray-200 mr-12'
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-wide text-gray-400 block mb-1">
              {m.role}
            </span>
            <p className="text-gray-800 whitespace-pre-wrap">{m.content}</p>

            {/* Display Tool Output Cards */}
            {m.toolInvocations?.map((tool) => {
              const { toolName, toolCallId, state } = tool;

              if (state !== 'result') {
                return (
                  <div key={toolCallId} className="mt-2 text-sm text-blue-600 animate-pulse">
                    ⚙️ Processing {toolName}...
                  </div>
                );
              }

              const { result } = tool;

              // Render Database Tool Results in a Table
              if (toolName === 'databaseChatTool' && result.success) {
                return (
                  <div key={toolCallId} className="mt-3 overflow-x-auto border rounded bg-gray-50 p-3">
                    <p className="text-xs font-semibold text-gray-500 mb-2">
                      MongoDB Results ({result.data?.length || 0} items):
                    </p>
                    <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </div>
                );
              }

              // Render Movie Results with Posters
              if (toolName === 'movieDatabaseTool' && result.success) {
                const { movie, recommendations, source } = result;
                return (
                  <div key={toolCallId} className="mt-3 border rounded-lg p-4 bg-gray-50 flex flex-col gap-3">
                    <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded w-fit">
                      Source: {source}
                    </span>
                    <div className="flex gap-4">
                      {movie.poster && (
                        <img src={movie.poster} alt={movie.title} className="w-24 h-36 object-cover rounded shadow" />
                      )}
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{movie.title} ({movie.year})</h3>
                        <p className="text-xs text-gray-600 mt-1">
                          ⭐ {movie.rating} | Genre: {movie.genre} | Dir: {movie.director}
                        </p>
                        <p className="text-sm mt-2 text-gray-700">{movie.plot}</p>
                      </div>
                    </div>

                    {recommendations?.length > 0 && (
                      <div className="mt-2 pt-2 border-t">
                        <p className="text-xs font-bold text-gray-500">Related Recommendations from MongoDB:</p>
                        <div className="flex gap-2 mt-1">
                          {recommendations.map((rec: any, idx: number) => (
                            <span key={idx} className="text-xs bg-white border px-2 py-1 rounded text-gray-700">
                              {rec.title} ({rec.year})
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              // Render Dad Joke Cards
              if (toolName === 'dadJokesTool' && result.success) {
                return (
                  <div key={toolCallId} className="mt-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-900">
                    <p className="text-lg font-medium">"{result.joke}"</p>
                  </div>
                );
              }

              return null;
            })}
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Try: 'Show sci-fi movies', 'Search movie Inception', or 'Tell me a dad joke'"
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          disabled={isLoading}
        >
          Send
        </button>
      </form>
    </main>
  );
}