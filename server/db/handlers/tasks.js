const db = require('./../config');

const submitSolution = (req, res) => {

  db.User.findOne({login: req.userLogin}).exec().catch(err => {
    res.json({
      success: false,
      erros: err
    })
  })
  .then(user => {

    return db.Task.findByIdAndUpdate(req.params.id, {
      "$addToSet": {
        solutions: {
          sandbox_link: req.body.sandbox_link,
          user: user._id
        }
      }
    }, {new : true}).exec().catch(err => {
      res.json({
        success: false,
        erros: err
      })
    })

  })
  .then(updatedTask => {
    console.log('task: ', updatedTask)
    res.json({
      success: true
    })
  })

}

module.exports = {

  getAllTasks: (req, res) => {

    db.Task.find({}, (err, docs) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      }

      res.json(docs);
    })

  },

  createTask: (req, res) => {

    db.Task.create(req.body.task, (err, doc) => {
      if (err) {
        console.log(err);
        res.json({
          success: false,
          errors: err
        });
      }

      res.json({
        success: true,
        doc: doc
      });
    })

  },

  getOneTask: (req, res) => {

    db.Task.findOne({
      slug: req.params.slug
    }, (err, doc) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      }

      res.json(doc);
    })

  },

  updateTask: (req, res) => {

    var update = Object.assign({}, req.body.task, {
      date_updated: Date.now()
    })

    db.Task.findByIdAndUpdate(req.params.id, update, { new: true }, (err, doc) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      }

      res.json(doc);
    })

  },

  removeTask: (req, res) => {

    db.Task.findByIdAndRemove(req.params.id, (err) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      }

      res.json({
        success: true
      });
    })

  },

  submitSolution

}
