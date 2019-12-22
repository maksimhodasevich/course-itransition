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
// @access  For admin only
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
// @desc    Appoint/remove admin // block/unblock user
// @access  Private
router.put("/", auth, (req, res) => {
  const { value, checkedUsers, method } = req.body;
  let promises = checkedUsers.map(async userID => {
    if (method === "setAdmin") {
      return User.updateOne({ _id: userID }, { $set: { admin: value } })
              .then(() => userID);
    } else if (method === "blockUser") {
      return User.updateOne({ _id: userID }, { $set: { blocked: value } })
              .then(() => userID);
    }
  });
  Promise.all(promises).then(() => {
    User.find().then(users => res.json(users));
    return;
  });
});

module.exports = router;