// Helper delay function
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function SlowComponent() {
  // Simulate a slow 3-second database/API request
  await delay(10000);

  return (
    <div style={{ padding: '16px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px' }}>
      <h2>🐢 Slow Data Successfully Loaded!</h2>
      <p>This component took 10 seconds to render on the server.</p>
    </div>
  );
}