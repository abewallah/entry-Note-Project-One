const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../models');

router.get('/signUp', (req, res) => {
  res.render('users/signUp');
});

router.post('/', (req, res) => {
  db.User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) return res.send(err);
    if (!foundUser) {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.send(err);
        bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
          const newUser = {
            fName: req.body.fName,
            lName: req.body.lName,
            email: req.body.email,
            password: hashedPassword,
          };

          db.User.create(newUser, (err, createdUser) => {
            if (err) return res.send(err);

            res.redirect('/users/login');
          });
        });
      });
    } else {
      return res.redirect('/users/signUp');
    }
  });
});

router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post('/login', (req, res) => {
  db.User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) {
      return res.send(err);
    }

    if (!foundUser) {
      return res.redirect('/login');
    }

    bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
      if (err) return res.send(err);

      if (result) {
        req.session.currentUser = foundUser;
        res.redirect('/users/profile-page');
      } else {
        res.redirect('/users/login');
      }
    });
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.send(err);
    res.redirect('/');
  });
});

router.get('/profile-page', (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect('/users/login');
  }

  db.User.findById(req.session.currentUser._id)
    .populate('courses')
    .exec((err, foundUser) => {
      if (err) return res.send(err);

      const context = {
        currentUser: foundUser,
        loggedInUser: req.session.currentUser,
      };
      res.render('users/profile', context);
    });
});

module.exports = router;
