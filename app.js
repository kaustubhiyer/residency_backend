// Package Imports
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose')

// Import Routes/Middleware


// Setup
dotenv.config();
const app = express()

// Initialize request object to meet requirements
app.use(express.json());
app.use(cors());

// Route setup


// Error Handling
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.status || 500;
  const msg = err.message;
  const data = err.data;
  return res.status(status).json({
    message: msg,
    data,
  });
});


// Listen for requests
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT);
}).catch((err) => {
  console.log(err);
})
