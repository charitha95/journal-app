const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

/* Empty JS object to act as endpoint for all routes */
projectData = { dum: 'dummy' };

/* Start up an instance of app */
const app = express();

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('website'));

const port = 3000;
/* Spin up the server*/
const server = app.listen(port, listening);
function listening() {
  console.log(`running on localhost: ${port}`);
};

// GET route
app.get('/all', (req, res) => {
  res.send(projectData);
});


// POST route
app.post('/add', (req, res) => {
  projectData = { ...req.body };
  res.send({ 'message': 'saved successfully!' });
});
