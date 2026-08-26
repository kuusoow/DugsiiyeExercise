import { useState ,useEffect } from "react"

export default function App(){
  const [name,setName] =useState('')
  const [greeting , setGreeting] =useState('hello')
  const [title ,setTitle] =useState('Welcome')

useEffect(function(){
  
  if(name !== ''){
  setTitle(greeting + " "+ name)
  }
  

},[name , greeting])


  return(
<>
    <title>{title}</title>
    <label htmlFor="name"> Enter Your Name</label> <br/>
    <input type='text' id='name'
    value={name}
    onChange={(e)=>setName(e.target.value)}
    /><br/>
    <label htmlFor="greet"> Enter Your Name</label> <br/>
    <input type='text' id='greet'
    value={greeting}
    onFocus={()=>setGreeting("")}
    onChange={(e)=>setGreeting(e.target.value)}
    />
</>
  )
}