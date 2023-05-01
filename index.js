const express=require("express");
const app=express();
const {connection}=require("./db");
const { userRouter } = require("./Routes/User.route");
var jwt = require('jsonwebtoken');
var cors = require('cors');
require('dotenv').config();
const { auth } = require("./middleware/Authorization");
const { notesroute } = require("./Routes/Notes.router");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
app.use(express.json());
app.use(cors());
app.use("/user",userRouter);

// app.use(auth);

app.use("/notes",notesroute);

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Learning API documentation',
        version: '1.0.0',
      },
    },
    apis: ['./Routes/*.js'], // files containing annotations as above
  };
  
  const specs = swaggerJsdoc(options);
  app.use('/api_docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get("/movie",(req,res)=>{

        res.status(200).send("movie data");
});





app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("connecting....")
    } catch (error) {
        console.log(error);
        console.log("Cannot connect");
    }
    console.log("connected to port 8080")
})