import { useState,useEffect } from "react"
export default function App(){
  const [usersData ,setUsersData] =useState(null)
  const [inputValue,setInputValue]=useState('')
  const [searchTerm ,setSearchTerm]=useState('')
   
   useEffect(function(){
      if( !searchTerm) return
        const fetchinguserData =async()=>{
          try{
            const response =await fetch(`https://api.github.com/users/${searchTerm}`)
            const data = await response.json()
            setUsersData(data)

          }catch(error){
            console.error('error',error)
          }
        }
        fetchinguserData()
    
      
    },[searchTerm])


  function handleClick(){
   setSearchTerm(inputValue)
  }
  return(
<>
<h1>Github User Search</h1>
<input type="text"
 placeholder="Enter Github Username"
 onFocus={()=>setInputValue('')}
 onChange={(e)=>setInputValue(e.target.value)}
 />
<button onClick={handleClick}>Search</button>
{
  usersData &&
  <>
  <h2>{usersData.name}</h2>
  <img src={usersData.avatar_url}/>
  </>
}
</>
  )
}