const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("../../config/keys");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = require("../../models/User");

sendEmail = (newUser, password) => {
  // console.log(newUser);
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "maksim.hodasevich@gmail.com",
      pass: "Hkooc4321"
    }
  });

  let mailOptions = {
    from: "maksim.hodasevich@gmail.com",
    to: newUser.email,
    subject: "Fanfik webpage registration",
    html: `<a href="http://localhost:5000/api/reg/email?regdate=${newUser.regdate}&admin=${newUser.admin}&theme=${newUser.theme}
           &_id=${newUser._id}&name=${newUser.name}&email=${newUser.email}&password=${password}">Link to reg</a>`
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error.message);
    }
  });
};

// @route   POST api/users
// @desc    Register new user
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
        res.send(`<h1>Now you can <a href="${"http://localhost:3000"}">log in</a></h1>`);
      }
    );
  });
});

module.exports = router;