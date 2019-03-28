require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const router = require('./middlewares/upload')
const app = express();

app.use(express.static('public'));

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/test`).then(() => {
  console.log('Connect successsssss');
  app.listen(process.env.APP_PORT);
}, err => {
  console.log('Connect faileddddd: ' + err);
});

app.get('/', (req, res) => {
  res.send("YAYYYYYA")
});

app.get('/all', (req, res) => {
  // Demo.find().then(all => {
  //   console.log(all);
  //   res.send(all)
  // });
});

app.post('/upload', router);


app.get('/path1/:param1', function(req, res) {
  console.log(req.params.param1);

  res.send(req.params.param1);
});