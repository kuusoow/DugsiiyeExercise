

import React from 'react';

const UseForm = (props) => {
 
const [formDate, setFormDate] =React.useState(props)

function handleChange (e){
 const {name, value} =e.currentTarget


 setFormDate(prev => ({...prev , [name]:value}))
}

  return {formDate,handleChange}
}

export default UseForm;
