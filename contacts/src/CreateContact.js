import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function CreateContact() {
  // Contact attributes defined in the database
  const [phoneid, setPhoneid] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  // Navigation tool imported to redirect the URL
  const navigate = useNavigate();

  // Takes the user back to homepage if the new contact creation is successful
  function handleSubmit(event){
    event.preventDefault();
    axios.post('http://localhost:8081/add', {phoneid, fname, lname, email})
    .then(res =>{
      console.log(res);
      navigate('/');
    }).catch(err => console.log(err));
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Phone Number:</label><br/>
        <input type="number" name="contact_phoneid"
        onChange={e => setPhoneid(e.target.value)}/><br/>

        <label htmlFor="">First name:</label><br/>
        <input type="text" name="contact_firstName"
        onChange={e => setFname(e.target.value)}/><br/>

        <label htmlFor="">Last name:</label><br/>
        <input type="text" name="contact_lastName"
        onChange={e => setLname(e.target.value)}/><br/>

        <label htmlFor="">Email:</label><br/>
        <input type="email" name="contact_email"
        onChange={e => setEmail(e.target.value)}/><br/><br/>

        <button>Submit</button>
      </form>
    </div>
  )
}

export default CreateContact
