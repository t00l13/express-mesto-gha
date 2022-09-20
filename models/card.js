const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlengtn:30,
  },
  link: {
    type: String,
    required: true,
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: {
    default: [],
  },
  createdAt: {
    type: String,
  }
});

module.exports = mongoose.model("card", cardSchema);