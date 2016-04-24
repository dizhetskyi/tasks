const db = require('./../config');
const mongoose = require('mongoose');

const assignTask = (req, res) => {

  db.User.findOneAndUpdate({login: req.userLogin}, {
    $addToSet: {
      tasks: req.body.taskId
    }
  }, {new: true}).exec().catch(err => {
    res.json({
      success: false,
      erroes: err
    })
  })
  .then(updatedUser => {

    res.json({
      success: true,
      addedId: req.body.taskId
    })

  })

}

const dismissTask = (req, res) => {

  db.User.findOneAndUpdate({login: req.userLogin}, {
    $pull: {
      tasks: req.body.taskId
    }
  }, {new: true}).exec().catch(err => {
    res.json({
      success: false,
      erroes: err
    })
  })
  .then(updatedUser => {

    res.json({
      success: true,
      removedId: req.body.taskId
    })

  })

}

const getTasks = (req, res) => {

  db.User.findOne({login: req.userLogin}).exec().catch(err => {
    res.json({
      success: false,
      erroes: err
    })
  })
  .then(user => {

    res.json({
      success: true,
      tasks: user.tasks
    })

  })

}

module.exports = {
  assignTask,
  dismissTask,
  getTasks
}
