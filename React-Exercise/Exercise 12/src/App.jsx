import { useState } from "react"

const App = ()=>{
    
    const [count ,setCount] =useState(0)

    const handleDecrement =()=>{
      if(count > 0){
        return setCount(prev=>prev-1)
      }
    }
    const handleIncrement =()=>{
      setCount(prev=>prev+1)
    }

  return(
<>
<h1>Count:{count}</h1>
<button  disabled={count === 0 }   onClick={handleDecrement}>Decrement</button>
<button onClick={handleIncrement}>Increment</button>


</>


  )
}

export default App