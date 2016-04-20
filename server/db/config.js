const credentials = require('./dbCredentials');

const TaskModel = require('./models/task');
const UserModel = require('./models/user');

module.exports = {
  uri: `mongodb://${credentials.username}:${credentials.password}@ds013260.mlab.com:13260/baraholka`,
  Task: TaskModel,
  User: UserModel
}