import { useEffect,useState } from "react"
export default function App(){
  const [mousetracker,setMouseTracker] =useState({x:0,y:0})

  useEffect(function(){
    function handleMouse(e){
      setMouseTracker({x:e.clientX , y: e.clientY})
    }
    window.addEventListener('mousemove',handleMouse)
    return function(){
      window.removeEventListener('mousemove',handleMouse)
    }
  },[]
  )
  return(
    
      <>
      <h1>Mouse X :{mousetracker.x}</h1>
      <h2>mouse Y :{mousetracker.y}</h2>
      </>
  )
}