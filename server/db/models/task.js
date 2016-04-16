const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String
  },
  slug: {
    type: String
  },
  content: {
    type: String
  },
  repository_link: {
    type: String
  },
  level: {
    type: Number
  },
  tips: [
    {
      type: String
    }
  ]
})

const taskModel = mongoose.model('t_tasks', taskSchema);

module.exports = taskModel;