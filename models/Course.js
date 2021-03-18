const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coursesSchema = new Schema({
  courseName: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  diffculty: {
    type: String,
  },
  departmentName: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Note',
    },
  ],
});

const Course = mongoose.model('Course', coursesSchema);

module.exports = Course;
