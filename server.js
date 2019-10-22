const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

// Creating the express server and our port
const app = express();
const port = process.env.PORT || 5000;

// parsing json data
app.use(cors());
app.use(express.json());

// mongoose setup
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

app.get('/',(req, res)=>{
    res.send('Hello world')
})

//call posts router
const postsrouter = require('./routes/posts');
app.use('/posts', postsrouter);

// call register route
const registerrouter = require('./routes/register');
app.use('/user', registerrouter);


// configuring port
app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});