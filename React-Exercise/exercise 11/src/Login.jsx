import {  useState } from "react"

 export default function (){
 const [login ,setLogin] =useState(false)
 const [userName, setUserName] =useState('')
 const [password, setpassword] =useState('')
    const [error ,setError]=useState('')
    const handleClick = ()=>{
        if(userName === ('') || password ===('')) {
            setError("Please fill Username and Password")
            return
    }
    
    if(userName && password){
        setLogin(true)

    }

    }

    const logiout =()=>{ 
        setUserName('')
        setpassword('')
        
        setLogin(false)}

    return(
        
        <>
        {login  ?(
        <>
         <h1> <strong>Welcome , {userName}</strong></h1> <br/> <button onClick={logiout}>Logout</button>
         </>
        ):(<>
        
       <h1> <strong>Login</strong></h1>
       <label><strong>Username:</strong></label>
       <input type="text" 
       onFocus={()=>setUserName('')}
       onChange={(e)=>setUserName(e.target.value)}
       
        value={userName}

        
       
        required/> <br/>

       <label><strong>Password:</strong></label>
       <input type="password"
        required
        

            onFocus={()=>setpassword('')}
            onChange={(e)=>setpassword(e.target.value)}
            value={password}
        
        /><br/>

       <button onClick={handleClick}>Login</button>
       
       </>)

        }
       
        </> 
    
    
    )

 }