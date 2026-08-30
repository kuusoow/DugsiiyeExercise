import { useReducer } from "react"

const initialState = {

  step:1,
  firstName:"",
  lastName:"",
  Email:"",
  phoneNumber:""

}

const reduce =(state,action)=>{

  switch(action.type){

    case"update":
    return {
      ...state,
      [action.name]:action.value}
      case"next":
      return {
        ...state,
        step : state.step +1
      }
      case"prev":
      return {
        ...state,
        step : state.step -1
      }
      case"reset":
      return ( 
        alert('sumbited successfully!'),
        initialState )
       default:
        return state

  }


}



const App =()=>{
const [state,dispatch]=useReducer(reduce,initialState)

const handleChange =(e)=>{
 dispatch({
  type:"update",
  name:e.target.name,
  value:e.target.value
 })


}



  return(
  <>
  <h1><strong>Multi-step Registration</strong></h1>
  {state.step === 1 && (
    <>
    <h2>step {state.step}:Profile</h2>

    <label>first Name:</label>
    <input type="text"
    required
    name="firstName"
    onChange={(e)=>handleChange(e)}
    value={state.firstName}
    
    /> <br/>
    <label>last Name:</label>
    <input type="text"
    required
    name='lastName'

    onChange={(e)=>handleChange(e)}
     value={state.lastName}
    /> <br/>

    <button onClick={()=>dispatch({type:"next",})}>Next</button>

</>
  )

  
  
  }
  {state.step === 2 && (
    <>
    <h2>step {state.step}:Contact</h2>

    <label>Email:</label>
    <input type="email"
    required
    name="Email"
    onChange={(e)=>handleChange(e)}
     value={state.Email}
    
    /> <br/>
    <label>Phone:</label>
    <input type="number"
    required
    name="phoneNumber"
    onChange={(e)=>handleChange(e)}
     value={state.phoneNumber}
    
    /> <br/>

    <button onClick={()=>dispatch({type:"prev",})}>Back</button>
    <button onClick={()=>dispatch({type:"next",})}>Next</button>

</>
  )

  }
  {state.step === 3 && (
    <>
    <h2>step {state.step}:Review</h2>

    <h1><strong>First Name : {state.firstName}</strong></h1>
    <h1><strong>last Name : {state.lastName}</strong></h1>
    <h1><strong>last Name : {state.Email}</strong></h1>
    <h1><strong>last Name : {state.phoneNumber}</strong></h1>

    <button onClick={()=>dispatch({type:"prev",})}>Back</button>
    <button onClick={()=>dispatch({type:"reset",})}>confirm</button>

</>
  )

  }
  </>
  )
}
export default App
