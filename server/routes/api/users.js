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

// @route   DELETE api/users
// @desc    Delete checked users (for admin)
// @access  Private (for admin)
router.delete("/", (req, res) => {
  const IDs = req.query.ids;
  let promises = IDs.map(async userID => {
    return User.findOneAndDelete({ _id: userID }).then(() => {
      return userID;
    });
  });
  Promise.all(promises).then(() => {
    res.sendStatus(200);
    return;
  });
});

// @route   PUT api/users
// @desc    Appoint/remove admin
// @access  Private
router.put("/", auth, (req, res) => {
  const value = req.body.value;
  const IDs = req.body.users;

  let promises = IDs.map(async userID => {
    return User.update({ _id: userID }, { $set: { admin: value } }).then(() => {
      return userID;
    });
  });
  Promise.all(promises).then(() => {
    User.find()
    .select("-password")
    .then(users => res.json(users));
    return;
  });
});

module.exports = router;