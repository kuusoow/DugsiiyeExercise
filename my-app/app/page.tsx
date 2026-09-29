'use client';

import React from 'react'
import PasswordFormPage from './components/PasswordForm'
import GreetingPage from './components/Greeting'



import { useState } from 'react';
import { submitEmail } from './api/form/action';

export default function BasicFormPage() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(formData: FormData) {
    await submitEmail(formData);
    setSubmitted(true);
  }

  return (
    <>
    <main style={{ padding: '20px' }}>
      <h1>Basic Form</h1>
      {submitted ? (
        <p style={{ color: 'green', fontWeight: 'bold' }}>Thanks for submitting!</p>
      ) : (
        <form action={handleSubmit}>
          <label>
            Email:
            <input type="email" name="email" required className='p-2 border rounded color-gray-300' />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </main>
      <PasswordFormPage/>
      <GreetingPage/>
    </>
  );
}

