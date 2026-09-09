import React from 'react'

const App = () => {

      
  const [FormData,setFormData] =React.useState({
    name:'',
    email:'',
    password:'',
  })
  const [ischecked ,setIsChecked] =React.useState(false)
    const [selectedOption, setSelectedOption] = React.useState('');

const handleChange =(e)=>{
  console.log(e)
  const {name ,value} = e.target
  setFormData(prev => ( {...prev , [name]:value}))
}
function handleSubmit(e){
  e.preventDefault()
  console.log('submited', FormData ,ischecked, selectedOption)
}
function hanleChecBox(){
  setIsChecked(prev => !prev)
}

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' 
      onChange={handleChange}
      name='name'
      placeholder='enter username'
      value={FormData.name}
       />
      <input type='email' 
      onChange={handleChange}
      placeholder='enter email'
      name='email'
      value={FormData.email}
       />
      <input type='password' 
      onChange={handleChange}
      name='password'
      placeholder='enter passsword'
      value={FormData.password}
       />
        <label>ischecked</label>
        <input type='checkbox'  name='check' value={ischecked} onClick={hanleChecBox}/>

    

<select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
  <option value="">Select an option</option>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</select>



       <button>submit</button>
    </form>
  )
}

export default App
