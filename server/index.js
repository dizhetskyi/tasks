const express = require('express');
const path = require('path');

const fetch = require('isomorphic-fetch');

const bodyParser = require('body-parser');

const app = express();
const port = 8888;

const settings = require('./appSetiings');

settings.applyToApp(app);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, skipAuthorization, Authorization');
  next();
}

app.use(allowCrossDomain);

const server = app.listen(port, () => {
  console.log('running at http://localhost:%s', port);
})

const mongoose = require('mongoose');
const db = require('./db/config');

mongoose.connect(db.uri);


// api
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


// auth
const authRouter = express.Router();
const authAPI = require('./db/handlers/auth');

authRouter.route('/github')
  .get(authAPI.githubAuth)
  .post(authAPI.githubAuth)

app.use('/auth', authRouter);