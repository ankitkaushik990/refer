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
    unique: true,
  },
  referralBonus: {
    type: Number, // Add the referralBonus field
    default: 0, // Default value is 0
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
  referralCode: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("User", userSchema);
