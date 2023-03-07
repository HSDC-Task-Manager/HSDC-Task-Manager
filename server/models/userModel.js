const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// bcrypt
// const SALT_WORK_FACTOR = 10;
// const bcrypt = require('bcryptjs');

/**
 * DUMMY:
 * username: test, password: test, board_ids: [1]
 */

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  board_ids: [String],
});

// userSchema.pre('save', function(next) {
//   // bcrypt.hash()
//   console.log('PRE SAVE', this.password);
//   return next();
// });
// userSchema.pre('find', function(next) {
//   // bcrypt.hash()
//   //'this' is not pulling the find inputs - why?
//   console.log('PRE FIND', this);
//   return next();
// })

const User = mongoose.model("users", userSchema);

module.exports = User;
