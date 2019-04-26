require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.static('public'));

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/test`).then(() => {
  console.log('Connect successsssss');
  app.listen(process.env.APP_PORT);
}, err => {
  console.log('Connect faileddddd: ' + err);
});

app.enable('trust proxy');

app.use ((req, res, next) => {
  if (req.secure) {
    next();
  } else {
    res.redirect('https://' + req.headers.host + req.url);
  }
});

app.use(require('./routers'));