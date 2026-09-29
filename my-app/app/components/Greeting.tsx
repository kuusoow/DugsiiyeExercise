'use client';

import { useState} from 'react';

export default function GreetingPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [greeting, setGreeting] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (firstName.trim() && lastName.trim()) {
      setGreeting(`Hello, ${firstName} ${lastName}!`);
    }
  };

  return (
    <main style={{ padding: '20px' }}>
      <h1>Full Name Greeting</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '8px' }}>
          <label>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className='ml-2 border border-gray-300 rounded px-2 py-1'
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: '8px' }}>
          <label>
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
               className='ml-2 border border-gray-300 rounded px-2 py-1'
              required
            />
          </label>
        </div>
        <button type="submit">Greet Me</button>
      </form>

      {greeting && <h2 style={{ marginTop: '20px' }}>{greeting}</h2>}
    </main>
  );
}