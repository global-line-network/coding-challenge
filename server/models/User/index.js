const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    firstName: {
      type: String
    },
    lastName: {
      type: Boolean
    },
    DOB: {
      type: String
    },
    avatar: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
