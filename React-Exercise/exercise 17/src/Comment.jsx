import React from 'react'
import UseForm from './UseForm'

function Comment() {

    const {formDate, handleChange} =UseForm(
        {
            name:'',
            email:'',
            message:''

        }
    )


    function handleSubmit(e){
        e.preventDefault();
        console.log(formDate)

    }
  return (
    <div>
        <h1>Write tou comment here</h1>
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
        <label>Message</label>
        <input type='text' 
        onChange={handleChange}
        name="message"
        value={formDate.password}
        />
       <br/>
       <button>Send </button>
       </form>
      
    </div>
  )
}

export default Comment
