const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  regdate: {
    type: String,
    default: new Date()
  },
  admin: {
    type: Boolean,
    default: false
  },
  theme: {
    type: String,
    default: "light"
  }
});

module.exports = User = mongoose.model("user", UserSchema);