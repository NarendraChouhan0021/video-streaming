const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
const config = require("./config/key");


const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(cors())

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(express.json());
// app.use(cookieParser());

app.use('/api/video', require('./routes/video'));
// app.use('/api/subscribe', require('./routes/subscribe'));
// app.use('/api/comment', require('./routes/comment'));
// app.use('/api/rating', require('./routes/rating'));
app.use('/uploads', express.static('uploads'));

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});