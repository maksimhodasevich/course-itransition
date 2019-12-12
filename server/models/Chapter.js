const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChaptrerSchema = new Schema({
  bookID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  // index: {
  //   type: Number,
  //   required: true
  // },
  likesFromID: {
    type: String,
    required: true
  },
  images: {
    type: String,
    required: true
  }
});

module.exports = Chaptrer = mongoose.model("chapter", ChaptrerSchema);
