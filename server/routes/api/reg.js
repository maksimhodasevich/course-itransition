const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("../../config/keys");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = require("../../models/User");

sendEmail = (newUser, password) => {
  let mailOptions = {
    from: "maksim.hodasevich@gmail.com",
    to: newUser.email,
    subject: "Fanfik webpage registration",
    html: `<a href="http://localhost:5000/api/reg/email?regdate=${newUser.regdate}&admin=${newUser.admin}&theme=${newUser.theme}
           &_id=${newUser._id}&name=${newUser.name}&email=${newUser.email}&password=${password}&token=">Link to register on fanfiks' page!!!</a>`
  };
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: config.googleCredentials.email,
      pass: config.googleCredentials.password
    }
  });
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error.message);
    }
  });
};

// @route   POST api/users
// @desc    Send registration link to email
// @access  Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });
    const newUser = new User({
      name,
      email,
      password
    });
    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        sendEmail(newUser, hash);
        res.sendStatus(200);
      });
    });
  });
});

// @route   get api/users/email/?params=...
// @desc    Catch registration link click and register user
// @access  Public
router.get("/email", (req, res) => {
  const { name, email, password } = req.query;
  const newUser = new User({
    name,
    email,
    password
  });
  newUser.save().then(user => {
    jwt.sign(
      { id: user.id },
      config.jwtSecret,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.redirect(`${"http://localhost:3000"}`);
      }
    );
  });
});

module.exports = router;