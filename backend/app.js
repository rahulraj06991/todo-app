const express = require('express')
const  bodyParser = require('body-parser');

const todoRoutes = require('./routes/todos');

require('dotenv').config


//Cors 
//const cors = require('cors');

const app = express();

app.use(bodyParser.json());


app.use((req, res, next) => {
    console.log('some middleware');
    next();
})

//Manual Approach Without CORS Package
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // or specific origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

//app.options('*', cors());
//app.use(cors());

app.use(todoRoutes);

app.listen(8000);