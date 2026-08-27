  import { useState, useEffect } from "react"
  export default function App(){

    const [time,setTime] =useState(10)
    const [isRunning, setIsRunning] =useState(false)
    const [decresingTime,setDecresingTime]=useState(time)
  
    useEffect(function(){
      let timer 
      if(isRunning && decresingTime > 0){
      timer =  setInterval(function(){
          setDecresingTime(prev=>prev -1)
        },1000)

        return function(){
          clearInterval(timer)
        }
      }
    },[isRunning,decresingTime])

    const start =()=>{
      setIsRunning(true)
    }
    const stop =()=>{
      setIsRunning(false)
    }
    const reset = ()=>{
      setIsRunning(false)
      setDecresingTime(time)
    }
  return(
    <>
    <h1>Count Down Timer</h1>
    <label><strong>set Time(Seconds):</strong></label>
    <input type="number"
      min='1'
      value={time}
      onFocus={()=>setTime('')}
      onChange={(e)=>{
        const value =Number(e.target.value)
          setDecresingTime(value)
          setTime(value)
        
      }}
      
    />
    <h4>Time Left:{decresingTime} seconds</h4>
    <button disabled={isRunning} onClick={start}>Start</button>
    <button disabled={!isRunning} onClick={stop}>Stop</button>
    <button onClick={reset}>Reset</button>
    </>

  )
}