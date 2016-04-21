const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  slug: {
    type: String,
    required: true
  },
  content: {
    type: String,
    require: true
  },
  repository_link: {
    type: String
  },
  level: {
    type: Number,
    require: true,
    default: 1
  },
  tips: [
    {
      type: String
    }
  ],
  date_added: {
    type: Date,
    default: Date.now
  },
  date_updated: {
    type: Date,
    default: Date.now
  },
  tags: [
    {
      type: String
    }
  ],
  sandbox_link: {
    type: String
  }
})

const taskModel = mongoose.model('t_tasks', taskSchema);

module.exports = taskModel;
