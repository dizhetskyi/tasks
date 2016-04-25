const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    require: true,
    unique: true
  },
  email: {
    type: String
  },
  firstname: String,
  lastname: String,
  githubId: Number,
  tasks: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'Task'}
  ]
}, {
  collection: 't_users'
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
