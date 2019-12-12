const router = require("express").Router();
const auth = require("../../middleware/auth");

const Fanfik = require("../../models/Fanfik");
const Chapter = require('../../models/Chapter');

// @route   POST api/fanfiks
// @desc    Create fanfik
// @access  Private
router.post("/", auth, (req, res) => {
  const { userName, userID, fanfikName, description, gener, tags, chapters } = req.body;
  if (!fanfikName || !description) {
    return res.status(400).json({ msg: "Enter all fields" });
  }
  const fanfik = new Fanfik({
    userName,
    userID,
    fanfikName,
    description,
    gener,
    tags
  });
  // let bookID;
  fanfik.save().then((savedBook) => {
    // bookID = savedBook;
    Fanfik.find().then(allFanfiks => {
      res.send(allFanfiks);
    });
  });
});

// router.post("/chapters", auth, (req, res) => {
//   console.log(req.body.chapters);
//   res.send("wdwd wdn");
// });

router.get("/", (req, res) => {
  Fanfik.find().then(allFanfiks => {
    res.send(allFanfiks);
  });
});

module.exports = router;