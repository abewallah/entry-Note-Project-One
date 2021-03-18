# EntryNote-Project-One

# Deployment Website

# https://entrynote-project-one.herokuapp.com/

# Scope

- EntryNote is an app designed to help organize your courses. EntryNote gives the user the ability to create/update and delete courses. In each course the user can assemble notes for that peteculiar course this helps keep your notes specific to each course while taking them.

# Technologies Used:

- 1- Node.js
  - - body parser
  - - mongoDB
  - - mongoose
- 2- mongodb
- 3- Express
- 4- ejs - for HTML
- 5- bootstrap - for CSS Styling

# User Stories

- - EntryNote is for any one thats taking any type of courses and needs to write notes.

# Non-authenticated Users can:

- Not use the application without an account.

# Authenticated users can:

- Create, delete, and edit there list of courses.
- Create, delete, and edit there list of notes.
- View there profile page.

# Users

- First Name
- Last Name
- Email
- Password
- courses[Ref:]

# Course

- courseName
- instructor
- difficulty
- departmentName
- user
- notes: [Ref:]

# Note

- title
- bodys
- course: [Ref]
- user: [Ref:]

# Wireframe

![](public/assets/WireFrame.png)

## ERD

![](public/assets/ERD.png)

## Milestones

- Create Users
- Authentication

## Dependencies Installed

- body-parser
- express
- express-session
- mongodb
- mongoose
- nodemon
