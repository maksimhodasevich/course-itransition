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
// @access  Private
router.post("/", (req, res) => {
  console.log("Запрос пришел с клиента");
  const IDs = req.body.ids;
  let promises = IDs.map(async userID => {
    return User.findOneAndDelete({ _id: userID }).then(() => {
      return userID;
    });
  });
  Promise.all(promises).then(results => {
    console.log(results);
    res.send("all deleted");
    return;
  });
});

// router.post("/", auth, (req, res) => {
//   console.log(req);
//   // User.find()
//   //   .select("-password")
//   //   .then(users => res.json(users));
// });

module.exports = router;
