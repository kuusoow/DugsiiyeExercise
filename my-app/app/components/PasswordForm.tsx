'use client';

import { useState, type FormEvent } from 'react';


export default function PasswordFormPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setSuccess(false);
      return;
    }
    setError('');
    setSuccess(true);
  };

  return (
    <main style={{ padding: '20px' }}>
      <h1>Password Validation</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Password:
            <input
            className="border border-gray-300 rounded px-2 py-1 ml-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            
             
            />
          </label>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>Password accepted!</p>}
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}