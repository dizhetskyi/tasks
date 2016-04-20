const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    require: true
  },
  email: {
    type: String
  },
  firstname: String,
  lastname: String,
  githubId: Number
})

const UserModel = mongoose.model('t_users', userSchema);

module.exports = UserModel;