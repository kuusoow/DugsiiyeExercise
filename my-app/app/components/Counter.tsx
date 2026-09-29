'use client'

import React from 'react';

const Counter = () => {
const[counter, setCounter] = React.useState(0);
  return (
    <div>
      <h1>Count: {counter}</h1>
      <button className='bg-green-600 p-4 text-white' onClick={() => setCounter(counter + 1)}>Increment</button>
    </div>
  );
}

export default Counter;
