// Force server-side rendering on every request
export const dynamic = 'force-dynamic';

export default function TimePage() {
  const time = new Date().toLocaleTimeString();

  return (
    <main className="p-4">
      <h1>Server-Side Rendering (SSR) Demo</h1>
      <p>Current Server Time: <strong>{time}</strong></p>
    </main>
  );
}