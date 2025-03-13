import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


//Format to display each contact and their attributes
function Contact(){
  const [contact, setContact] =  useState([])

  // Using the useEffect hook to perform a side effect (data fetching) when the component mounts
  useEffect(() => {
      // Making a GET request to the server to fetch items
      axios.get('http://localhost:8081/')
            .then(res => setContact(res.data))
            .catch(err => console.log(err));
  }, [])

  //Delete a contact specified by their phone number
  const handleDelete = async (contact_phoneid) => {
    try{
      await axios.delete('http://localhost:8081/contact/'+contact_phoneid)
      window.location.reload()
    }catch(err){
      console.log(err);
    }
  }

  return(
    <div>
      <h1>Contact List</h1>
      <Link to ="/add">Add</Link>
      <table>

            <thead>
                <tr>
                  <th>Phone</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                </tr>
            </thead>

            <tbody>
              {contact.map((data, i) =>
                <tr key={i}>
                  <th>{data.contact_phoneid}</th>
                  <td>{data.contact_firstName}</td>
                  <td>{data.contact_lastName}</td>
                  <td>{data.contact_email}</td>
                  <td>
                    <Link to={`edit/${data.contact_phoneid}`}>Edit</Link>
                    <button onClick={e => handleDelete(data.contact_phoneid)}>Delete</button>
                    <button>See Image</button>
                  </td>
                </tr>
              )}
          </tbody>
      </table>
    </div>
  )
}


export default Contact
