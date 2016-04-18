const db = require('./../config');

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
        res.sendStatus(500);
      }

      res.json(doc);
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
      'date_updated': Date.now()
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

  }

}