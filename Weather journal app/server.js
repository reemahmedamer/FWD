// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());



// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port,()=>{
    console.log(`server is running on localhost: ${port}`); 
    
});

//GET Route
app.get('/all',  (req, res)=> {
    res.send(projectData)
  })

//POST Route

app.post('/addData',  (req, res)=> {
    console.log(req.body);
    projectData= req.body;
    res.sendStatus(200);
  })