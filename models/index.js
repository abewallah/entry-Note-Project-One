const mongoose = require("mongoose");
const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/entryNote';

const optionsObj = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
mongoose.connect(connectionString, optionsObj);

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected...");
});

module.exports = {
  Course: require("./Course"),
  Note: require("./Note"),
  User: require("./User"),
};
