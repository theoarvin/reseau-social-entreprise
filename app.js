// importation de express
const express = require('express');
const mongoose = require('./db/db');
const dotenv = require("dotenv");
dotenv.config();
const path = require('path');
const helmet = require('helmet');
// importation des routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const app = express();

app.use(helmet());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


app.use(express.json());

// route 

app.use('/api/user', userRoutes);
app.use('/api/post',postRoutes);

module.exports = app;