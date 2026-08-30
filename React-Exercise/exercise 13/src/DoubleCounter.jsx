
import { useReducer } from "react"
  
const intialState = {countA:0, countB:0}


const reduce = (state,action)=>{

    switch(action.type){
        case"increment+A" :
        return {...state , countA:state.countA +1}
        case"increment-A" :
        return {...state , countA:state.countA > 0 ? state.countA -1 : state.countA}
        case"increment+B" :
        return {...state , countB:state.countB +1}
        case"increment-B" :
        return {...state , countB:state.countB > 0 ? state.countB -1 : state.countB }
        case"reset":
         return intialState

        default:
            return state
    }

}
export default function DoubleCounter(){

const [state,dispatch]=useReducer(reduce,intialState)
    return(
        <>
            <h2>CounterA:{state.countA}</h2>
            <button onClick={()=>dispatch({type:"increment+A"})}>+A</button>
            <button  disabled={state.countA < 1} onClick={()=>dispatch({type:"increment-A"})}>-A</button>
            <h2>CounterB:{ state.countB}</h2>
            <button   onClick={()=>dispatch({type:"increment+B"})}>+B</button>
            <button disabled={state.countB < 1}  onClick={()=>dispatch({type:"increment-B"})}>-B</button>

            <br/>

            <button onClick={()=>dispatch({type:"reset"})}>Reset Both</button>
        </>
    )
}