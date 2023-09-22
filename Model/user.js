const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 200,
  },
  email: {
    type: String,
    trim: true,
    maxlength: 200,
    required: true,
    // unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    // select: false,
    maxlength: 100,
    minlength: 6,
  },
  referralBonus: {
    type: Number, // Add the referralBonus field
    default: 0, // Default value is 0
  },
  referCode: {
    type: String,
    default: null,
  },
  parentUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  childrenUser: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  parentCode: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    default: "Admin",
  },
});

module.exports = mongoose.model("User", userSchema);
