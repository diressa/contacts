// Import required modules
const express = require('express'); // Express framework for handling HTTP requests
const mysql = require('mysql2'); // MySQL2 client for Node.js
const cors = require('cors'); // For web security
const fileUpload = require('express-fileupload'); // For user uploads to save


// Create an instance of express
const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload()); // initializes express with FILEUPLOAD


// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: "localhost", // Database host
    user: "",      // Database username
    password: "", // Database password
    database: "contactsdb", // Name of the database
});


// Define a route to fetch all items from the 'contact' table with URL 'http://localhost:8081/'
app.get('/', (req, res) => {
    const sql = "select * from contact"; // SQL query to select all items

    db.query(sql, (err, data) => { // Execute the SQL query
        if (err) return res.json(err); // If there's an error, return the error
        return res.json(data); // Otherwise, return the data as JSON
    })
});


// Recieve new contact data in POST to process into the database
app.post('/add', (req, res) => {
  const sql = "INSERT INTO contact (contact_phoneid, contact_firstName, contact_lastName, contact_email) VALUES (?)";
  const values = [
    req.body.phoneid,
    req.body.fname,
    req.body.lname,
    req.body.email
  ]

  db.query(sql, [values], (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})


// Make changes to contact data via PUT request
app.put('/edit/:contact_phoneid', (req, res) => {
  const sql = "UPDATE contact SET contact_firstName = ?, contact_lastName = ?, contact_email = ? WHERE contact_phoneid = ?";
  const values = [
    req.body.fname,
    req.body.lname,
    req.body.email
  ]
  const contact_phoneid = req.params.contact_phoneid;

  db.query(sql, [...values, contact_phoneid], (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})


// Delete a contact entry
app.delete('/contact/:contact_phoneid', (req, res) => {
  const sql = "DELETE FROM contact WHERE contact_phoneid = ?";
  const contact_phoneid = req.params.contact_phoneid;

  db.query(sql, [contact_phoneid], (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})


// Upload endpoint, where uploaded files will be posted
app.post('/upload', (req, res) => {

  // Error catching if no file is found to upload
  if(req.files === null){
    return res.status(400).json({msg: 'No file uploaded'});
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const sampleFile_x = req.files.sampleFile;
  const uploadPath = __dirname + '/public/uploads/' + sampleFile_x.name;

  // Used the mv() method to place the file in the server, into folder "uploads"
  sampleFile_x.mv(uploadPath, function(err) {
    if (err) return res.status(500).send(err);

    res.send('File uploaded!');
  });
  //Uploaded file
  console.log(req.files.sampleFile);
});




// Start the server and listen on port 8081
app.listen(8081, () => {
    console.log("listening");
});
