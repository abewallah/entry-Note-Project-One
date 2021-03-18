const express = require('express');
const router = express.Router();
const db = require('../models');

//Get
router.get('/', (req, res) => {
  // console.log(req.session.currentUser)
  db.User.findById(req.session.currentUser._id, (err, foundUser) => {
    if (err) {
      return res.send(err);
    }

    db.Course.find({ user: req.session.currentUser._id }, (err, allCourses) => {
      if (err) {
        return res.send(err);
      }

      const context = {
        course: allCourses,
      };

      res.render('courses/index', context);
    });
  });
});

router.get('/new', (req, res) => {
  res.render('courses/new');
});

router.get('/:id', (req, res) => {
  const courseId = req.params.id;

  db.Course.findById(courseId)
    .populate('notes')
    .exec((err, foundCourse) => {
      if (err) {
        return res.send(err);
      }
      const context = {
        course: foundCourse,
      };

      res.render('courses/show', context);
    });
});

router.post('/', (req, res) => {
  const courseObj = {
    courseName: req.body.courseName,
    instructor: req.body.instructor,
    diffculty: req.body.diffculty,
    departmentName: req.body.departmentName,
    user: req.session.currentUser._id,
  };
  db.Course.create(courseObj, (err, createdCourse) => {
    if (err) {
      return res.send(err);
    }
    db.User.findByIdAndUpdate(
      req.session.currentUser._id,
      {
        $push: { courses: createdCourse._id },
      },
      {
        new: true,
      },
      (err, updatedUser) => {
        res.redirect('/users/profile-page/');
      }
    );
  });
});

router.get('/:id/edit', (req, res) => {
  db.Course.findById(req.params.id, (err, foundCourse) => {
    if (err) {
      return res.send(err);
    }

    const context = {
      course: foundCourse,
    };

    res.render('courses/edit', context);
  });
});

router.put('/:id', (req, res) => {
  db.Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, UpdatedCourse) => {
      if (err) {
        return res.send(err);
      }

      res.redirect('/courses');
    }
  );
});

router.delete('/:id', (req, res) => {
  db.Course.findByIdAndDelete(req.params.id, (err, deletedCourse) => {
    if (err) {
      return res.send(err);
    }
    db.Note.deleteMany({ course: deletedCourse._id }, (err, deletedCourse) => {
      db.User.findByIdAndUpdate(
        req.session.currentUser._id,
        { $pull: { courses: deletedCourse._id } },
        { new: true },
        (err, updatedUser) => {
          if (err) return res.send(err);
          res.redirect('/users/profile-page/');
        }
      );
    });
  });
});

module.exports = router;
