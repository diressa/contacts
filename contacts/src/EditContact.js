import React, {  useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
//import Head from './next/head'

function EditContact() {
  // Contact attributes defined in the database
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')

  const navigate = useNavigate(); // Imported to redirect URL
  const {contact_phoneid} = useParams(); // Imported to access parameters in the URL
  const [contact, setContact] =  useState([]) // To display current contact info before changes
  const [selectedFile, setSelectedFile] = useState(null); // Used in handleFileChange function
  const [uploadStatus, setUploadStatus] = useState(""); // Tracks upload status for user

  //Allows contact "map" to function
  useEffect(() => {
      // Making a GET request to the server to fetch items
      axios.get('http://localhost:8081/')
            .then(res => setContact(res.data))
            .catch(err => console.log(err));
  }, [])

  // Takes the user back to homepage if the contact edit is successful
  function handleSubmit(event){
    event.preventDefault();
    axios.put('http://localhost:8081/edit/'+contact_phoneid, {fname, lname, email})
    .then(res =>{
      console.log(res);
      navigate('/');
    }).catch(err => console.log(err));
  }

  // Handles file upload through 'onChange' in web <form>
  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]); // Store the file in state
    setUploadStatus(""); // Resets status when a new file is selected
  }

  // Handle uploads
  function handleUpload(event){
    //event.preventDefault();
    // Error handles if no file selected
    if (!selectedFile) {
        console.log("No file selected.");
        setUploadStatus("Please select a file.");
        return;
    }

    const formData = new FormData();
    formData.append("sampleFile", selectedFile); // Attach file
    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("email", email);

    axios.post('http://localhost:8081/upload', formData,{
      headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    .then(res =>{
      console.log(res);
      //navigate('/');
      setUploadStatus("Upload Successful!");
    }).catch(err => console.log(err));
      setUploadStatus("Upload Failed");
  }

  // Previous method to display: placeholder={data.contact_phoneid == contact_phoneid ? (data.contact_firstName): ""

  // Limits the display by filtering out the contacts that only match the edited object
  return(
    <div>
      <form>
        <div>Phone: {contact_phoneid}</div><br/>
        {contact.filter((data) => data.contact_phoneid == contact_phoneid).map((data, i) =>
          <div key={data.contact_phoneid}>

        <label htmlFor="fn">First name:</label> <br/>
        <input type="text"  placeholder={data.contact_firstName} name="contact_firstName"
        onChange={e => setFname(e.target.value)} id="fn"/> <br/>

        <label htmlFor="ln">Last name:</label> <br/>
        <input type="text" placeholder={data.contact_lastName} name="contact_lastName"
        onChange={e => setLname(e.target.value)} id="ln"/> <br/>

        <label htmlFor="em">Email:</label> <br/>
        <input type="email" placeholder={data.contact_email} name="contact_email"
        onChange={e => setEmail(e.target.value)} id="em"/> <br/> <br/>

        </div>
        )}
        <button onClick={handleSubmit}>Update</button>
      </form>

      <form
      action={handleUpload}
      id="uploadForm">
        <input
          className="file-uploader"
          type="file"
          accept="image/*"
          name="sampleFile"
          onChange={handleFileChange}
        />
         <input type='submit' value='Upload!' />
      </form>
      <p>{uploadStatus}</p>

    </div>

  )
}

export default EditContact
