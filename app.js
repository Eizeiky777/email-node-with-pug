/* eslint-disable no-unused-vars */
const { env } = process;
require('dotenv').config();
const express = require('express');
const router = require('./routes/api');
var path = require('path');

const app = express();
app.enable('trust proxy');

// Middleware
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use('/static', express.static('views'))
// app.set("views_2", path.join(__dirname, "views_2"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);


// listen on port
module.exports = app;
