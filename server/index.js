const express = require('express');
const path = require('path');

const fetch = require('isomorphic-fetch');

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

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

function ensureAuthenticated(req, res, next) {
  if (!req.header('Authorization')) {
    return res.sendStatus(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.header('Authorization').split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, app.get('secret'));
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  // TODO moment?
  // if (payload.exp <= moment().unix()) {
  //   return res.status(401).send({ message: 'Token has expired' });
  // }

  req.userLogin = payload.login;

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

apiRouter.route('/tasks/:id/solutions')
  .post(ensureAuthenticated, tasksAPI.submitSolution)


const usersAPI = require('./db/handlers/users');

apiRouter.route('/user/tasks')
  .get(ensureAuthenticated, usersAPI.getTasks)

apiRouter.route('/user/assignTask')
  .post(ensureAuthenticated, usersAPI.assignTask)

apiRouter.route('/user/dismissTask')
  .post(ensureAuthenticated, usersAPI.dismissTask)


app.use('/api', apiRouter);


// auth
const authRouter = express.Router();
const authAPI = require('./db/handlers/auth');

authRouter.route('/github')
  .get(authAPI.githubAuth)
  .post(authAPI.githubAuth)

app.use('/auth', authRouter);
