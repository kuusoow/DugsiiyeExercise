import React from 'react'

const ToggleButton =()=>{

const [isOn, setIsOn] = React.useState(false)

function handleClick(){
    setIsOn(!isOn)
}



return (
    <>
    <p>the button is{isOn ? ' ON':' OFF'}</p>
    <button onClick={handleClick}>Turn {isOn ?' OFF' : ' ON'}</button>
    </>
)

  
}

export default ToggleButton ;
