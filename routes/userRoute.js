//userRoute.js

// import external libraries
const express = require("express");
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser');
// import internal libraries
const { nodeEnv } = require('../config');

// defining the environment that the server will use (read from config file)
const NODE_ENV = nodeEnv || 'development';

// using the express.Router class to create modular, mountable route handlers
const router = express.Router();

// create application/json parser
const jsonParser = bodyParser.json()
 
// enable All CORS Requests
router.use(cors());

// production mode
if (NODE_ENV === 'production') {
  // static file declaration
  router.use(express.static(path.join(__dirname, '../news-portal/build')));
  // serve the index.html file from the build folder
  router.get('/', (req, res) => {    
    res.sendfile(path.join(__dirname, '../news-portal/build', 'index.html')); 
  });
}
// development mode
else {
  router.get('/', (req, res) => {  
    // serve the index.html file from the public folder
    //res.sendFile(path.join(__dirname, '../news-portal/public', 'index.html'));
    res.send({ response: "News Portal Backend" }).status(200);
  });
}

// define the home page route for POST requests, gets JSON data as body
router.post('/', jsonParser, (req, res) => {
  // received empty body
  if (!req.body) return res.sendStatus(400);
  const responseObj = { responseStatus: 'done',
                        email: req.body.email};
  // sending back the response to client with status code of 200
  res.send(responseObj).status(200);
});

module.exports = router;