require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userInterfaceRoutes = require('./routes/userInterface')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);


app.use('/api', userInterfaceRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to db')
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port ', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 



