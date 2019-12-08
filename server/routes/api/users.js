const router = require("express").Router();
const auth = require("../../middleware/auth");

const User = require("../../models/User");

// @route   GET api/users
// @desc    Get users list
// @access  Private
router.get("/", auth, (req, res) => {
  User.find()
    .select("-password")
    .then(users => res.json(users));
});

module.exports = router;
