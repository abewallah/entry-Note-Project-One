const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {
  db.Note.find({ user: req.session.currentUser._id }, (err, allNote) => {
    if (err) {
      return res.send(err);
    }

    const context = {
      noteArray: allNote,
    };
    res.render('notes/index', context);
  });
});

router.get('/new', function (req, res) {
  db.Course.find({}, (err, allCourses) => {
    if (err) return res.send(err);
    const context = {
      courses: allCourses,
    };
    res.render('notes/notenew', context);
  });
});

router.get('/:id', (req, res) => {
  const noteId = req.params.id;

  db.Note.findById(noteId)
    .populate('course')
    .exec((err, foundNote) => {
      const context = {
        note: foundNote,
      };
      res.render('notes/notesShow', context);
    });
});

//create note
router.post('/', function (req, res) {
  const obj = {
    title: req.body.title,
    bodys: req.body.bodys,
    course: req.body.course,
    user: req.session.currentUser._id,
  };

  db.Note.create(obj, (err, addedNote) => {
    if (err) {
      return res.send(err);
    }

    db.Course.findByIdAndUpdate(
      addedNote.course,
      { $push: { notes: addedNote._id } },
      { new: true },
      (err, updatedCourse) => {
        if (err) {
          return res.send(err);
        }

        res.redirect(`/courses/${updatedCourse._id}`);
      }
    );
  });
});

router.get('/:id/edit', function (req, res) {
  const noteId = req.params.id;

  db.Note.findById(noteId, function (err, foundNote) {
    const context = {
      note: foundNote,
    };

    res.render('notes/noteEdit', context);
  });
});

router.put('/:id', function (req, res) {
  const noteId = req.params.id;

  db.Note.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    function (err, updatedNote) {
      res.redirect('/notes');
    }
  );
});

router.delete('/:id', function (req, res) {
  const noteId = req.params.id;

  db.Note.findByIdAndDelete(noteId, function (err, deletedNote) {
    db.Course.findByIdAndUpdate(
      deletedNote.course,

      { $pull: { notes: deletedNote._id } },
      { new: true },
      (err, updatedNote) => {
        res.redirect('/notes');
      }
    );
  });
});
module.exports = router;
