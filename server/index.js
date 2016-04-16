const express = require('express');
const path = require('path');

const port = 8888;
const app = express();

const server = app.listen(port, () => {
  console.log('running at http://localhost:%s', port);
})

const mongoose = require('mongoose');
const db = require('./db/config');

mongoose.connect(db.uri);

db.Task.find({}, (err, docs)=>{
  console.log(docs);
})