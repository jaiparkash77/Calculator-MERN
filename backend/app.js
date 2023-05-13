const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cookieParser());

//Import route
const user = require('./routes/userRoute');
const calculate = require('./routes/calculatorRoute');

app.use("/api/v1", user);
app.use("/api/v1", calculate);

module.exports = app;