const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FanfikSchema = new Schema({
  userID: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  fanfikName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  gener: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
  },
  rating: {
    type: Number,
    default: 0
  },
  comments: {
    type: Array
  }
});

module.exports = Fanfik = mongoose.model("book", FanfikSchema);
