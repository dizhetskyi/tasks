const credentials = require('./dbCredentials');

const TaskModel = require('./models/task');

module.exports = {
  uri: `mongodb://${credentials.username}:${credentials.password}@ds013260.mlab.com:13260/baraholka`,
  Task: TaskModel
}