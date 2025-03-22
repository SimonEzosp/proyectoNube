require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose')
const cors = require('cors');

//crear el servidor 
const app = express();


//conexión DB
mongoose.connect(process.env.DB_CONNECT)
const db = mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.log('Connected to Db'))

//lectura y pasero del body
app.use(express.json())

//rutas
app.use(cors());

const user=require('./routes/auth')
app.use('/User',user) 


app.listen(process.env.PORT,()=>{console.log(`servidor corriendo ${process.env.PORT}`)});
