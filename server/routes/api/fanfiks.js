const router = require("express").Router();
const auth = require("../../middleware/auth");

const Fanfik = require("../../models/Fanfik");

// @route   POST api/fanfiks
// @desc    Create fanfik
// @access  Private
router.post("/", auth, (req, res) => {
  const fanfik = new Fanfik({
    userID: req.body.userID,
    fanfikName: req.body.fanfikName,
    description: req.body.description,
    gener: req.body.gener,
    tags: req.body.tags
  });
  // console.log(fanfik);

  fanfik.save().then(() => {
    Fanfik.find().then(allFanfiks => {
      res.send(allFanfiks);
    });
  });
});

router.get("/", (req, res) => {
  Fanfik.find().then(allFanfiks => {
    res.send(allFanfiks);
  });
});

module.exports = router;
