/*
*
*
**  RestFul web service project using Node.js,Express.js,mongoose.
*
*
*/

//requierd moduls using npm
const express = require('express');//framework based on node.js - to manage the server side
const bodyParser = require(`body-parser`);//the body-parser module to easy on pharse {..,content-type: application/json,...}

//moduls exported
const {PORT,DB_USERNAME,DB_PASSWORD,DB_HOST,...rest} = require(`./config/env`);
const database = require(`./config/database`);
const router = require(`./routers`);

const cors = require('cors');


database.connect(DB_USERNAME,DB_PASSWORD,DB_HOST).then(()=>{
    const app = express();
    
    app.use(cors());
    
    app.use(bodyParser.json());
    
    app.use(`/users/`,router);
   
    
    
    app.listen(PORT,()=>console.log(`example app listenning on port ${PORT} ${rest.GREETING}`));
});


