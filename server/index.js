const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const app = express();
const port = 8888;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8275');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.use(allowCrossDomain);

const server = app.listen(port, () => {
  console.log('running at http://localhost:%s', port);
})

const mongoose = require('mongoose');
const db = require('./db/config');

mongoose.connect(db.uri);


const apiRouter = express.Router();

const tasksAPI = require('./db/handlers/tasks');

apiRouter.route('/tasks')
  .get(tasksAPI.getAllTasks)
  .post(tasksAPI.createTask)

apiRouter.route('/tasks/:slug')
  .get(tasksAPI.getOneTask)

apiRouter.route('/tasks/:id')
  .put(tasksAPI.updateTask)
  .delete(tasksAPI.removeTask)

app.use('/api', apiRouter);