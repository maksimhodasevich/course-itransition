const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FanfikSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  tags: {
    type: String,
  },
  rating: {
    type: Number,
  },
  comments: {
    type: Array
  }
});

module.exports = Fanfik = mongoose.model("book", FanfikSchema);
