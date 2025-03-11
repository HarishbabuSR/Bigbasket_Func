//importing modules for server creation
const express = require('express');
const app = express(); //initializing express
const cors =require('cors'); //for cross browser access
const dotEnv = require('dotenv');
const mongoose = require('mongoose') //to perform database operations

//configure cors
app.use(cors());

//configure express to receive form data
app.use(express.json());

//configure dotEnv to access the .env file data
dotEnv.config({path : './.env'});
//hostname & port number from .env file
const hostname = process.env.HOST_NAME; //access from .env file
const port = process.env.PORT;

//connect to MongoDB, connect function returns a promises using JS
mongoose.connect(process.env.MONGO_DB_LOCAL_URL,{
    useCreateIndex : true,
    useFindAndModify : false,
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then((response)=>{
    console.log(`Successfully Connected to MongoDB...........`);
}).catch((error)=>{
    console.error(error);
    process.exit(1); //stops node js process if unable to connect
});

//simple request
app.get('/',(request,response)=>{
    response.send(`<h2>Welcome to big basket backend server</h2>`);
})

//Router configuration
app.use('/api',require('./router/productRouter'));

//listen function
app.listen(port,hostname,()=>{
    console.log(`Express Server is Started at http://${hostname}:${port}`);
})
