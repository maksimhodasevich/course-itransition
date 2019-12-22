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
  markdown: {
    type: String
  },
  likesFromID: {
    type: Array,
  },
  images: {
    type: Array,
  },
  createDate: {
    type: String
  }
});

module.exports = Chaptrer = mongoose.model("chapter", ChaptrerSchema);