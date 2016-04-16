const credentials = require('./dbCredentials');
const Task = require('./models/task');

module.exports = {
  uri: `mongodb://${credentials.username}:${credentials.password}@ds013260.mlab.com:13260/baraholka`,
  Task: Task
}