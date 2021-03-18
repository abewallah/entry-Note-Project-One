const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const courseRoute = require('./controllers/courseRoute');
const noteRoute = require('./controllers/noteRoute');
const userRoute = require('./controllers/userRoute');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

// app.set("view", "./views");
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  next();
});

app.use('/', express.static(__dirname + '/public/'));
//Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(
  session({
    secret: 'League of legends ruins lives',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 1,
    },
  })
);

app.use('/users', express.static(__dirname + '/public/'));
app.use('/notes', express.static(__dirname + '/public/'));
app.use('/courses', express.static(__dirname + '/public/'));

app.use('/notes', noteRoute);
app.use('/courses', courseRoute);
app.use('/users', userRoute);

//======ROUTES
app.get('/', (req, res) => {
  if (req.session.currentUser) {
    res.redirect('/users/profile-page');
  } else {
    res.render('index');
  }
});

// Listen For Requests From Client
app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});
