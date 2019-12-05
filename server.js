const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const users = require("./routes/api/users");
const auth = require("./routes/api/auth");


const app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017",{
                    useNewUrlParser: true, 
                    useCreateIndex: true
                })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/users', users);
app.use('/api/auth', auth);



const port = 5000;

app.listen(port, () => console.log("Server started on 5000")); 
