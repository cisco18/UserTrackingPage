require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userInterfaceRoutes = require('./routes/mainPage')
const userProfileRoutes = require('./routes/userUpdate')
const statsRoutes = require('./routes/userStats')

var cors = require('cors')

const bodyParser = require('body-parser')
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/api/start/', userInterfaceRoutes)
app.use('/api/profile/', userProfileRoutes)
app.use('/api/stats/', statsRoutes)

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



