import React from 'react'
import UseForm from './UseForm'
function Register() {
    const {formDate, handleChange} =UseForm(
        {
            name:'',
            email:'',
            username:'',
            password :''

        }
    )


    function handleSubmit(e){
        e.preventDefault();
        console.log(formDate)

    }
  return (
    <>
    <h1>Registering form</h1>
    <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type='text' 
        onChange={handleChange}
        name="name"
        value={formDate.name}
        />
      <br/>
        <label>Email:</label>
        <input type='email' 
        onChange={handleChange}
        name="email"
        value={formDate.email}
        />
       <br/>
        <label>Password</label>
        <input type='password' 
        onChange={handleChange}
        name="password"
        value={formDate.password}
        />
       <br/>
        <label>userName:</label>
        <input type='text' 
        onChange={handleChange}
        name="username"
        value={formDate.username}
        />
        <br/>
      <button>Submit</button> 
    </form>
    </>
  )
}

export default Register
