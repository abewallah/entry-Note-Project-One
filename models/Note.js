const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    bodys: {
      type: String,
      required: true,
    },
    // dateAdded: {
    //   type: Date,
    // },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamp: true }
);

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
