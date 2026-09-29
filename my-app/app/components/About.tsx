// Force static generation at build time
export const dynamic = 'force-static';

export default function AboutPage() {
     const time = new Date().toLocaleTimeString();
  return (
    <main className="p-4 font-sans">
      <h1>About Us</h1>
      <p>
        Welcome to our company! We build fast, modern web applications powered
        by Next.js.
      </p>
      <h2>Time developed this page was: {time}</h2>
    </main>
  );
}