import { useState,useEffect } from "react"
export default function App(){
  const [usersData ,setUsersData] =useState(null)
  const [inputValue,setInputValue]=useState('')
  const [searchTerm ,setSearchTerm]=useState('')
  const [loading, setLoading] =useState(false)
  const[error,setEroor]=useState('')
   
   useEffect(function(){
      if( !searchTerm) return
        const fetchinguserData =async()=>{
          try{
            const response =await fetch(`https://api.github.com/users/${searchTerm}`)

            if(!response.ok){throw new Error('GitHub user not found')}
            const data = await response.json()
            setUsersData(data)

          }catch(error){
            setEroor(error.message)
          }finally{
            setLoading(false)
          }
        }
        fetchinguserData()
    
      
    },[searchTerm])


  function handleClick(){
   setSearchTerm(inputValue)
   setLoading(true)
  }
  return(
<>
<h1>Github User Search</h1>
<input type="text"
 placeholder="Enter Github Username"
 onFocus={()=>setInputValue('')}
 value={inputValue}
 onChange={(e)=>setInputValue(e.target.value)}
 />
<button onClick={handleClick}>Search</button>
{
loading ? <h1>Loading....</h1> 
:error ?
( <h1>Error:{error}</h1>  

):

  usersData ?(
  <>
  <h2>{usersData.name}</h2>
  <img src={usersData.avatar_url}/>
  <h4>{usersData.followers} <strong>Followers</strong></h4>
  <h4>{usersData.following}<strong>Followeing</strong></h4>
  <h4>{usersData.public_repos}<strong>repositiries</strong></h4>
  <h4>{usersData.location}</h4>

  </>) :null

}
</>
  )
}