const router = require("express").Router();
const auth = require("../../middleware/auth");

const Fanfik = require("../../models/Fanfik");
const Chapter = require("../../models/Chapter");

// @route   POST api/fanfiks
// @desc    Create fanfik
// @access  Private
router.post("/", auth, (req, res) => {
  const { userName, userID, fanfikName, description, gener, tags, chapters } = req.body;
  const fanfik = new Fanfik({
    userName,
    userID,
    fanfikName,
    description,
    gener,
    tags,
    createDate: new Date()
  });
  fanfik.save().then(savedBook => {
    let promises = chapters.map(async item => {
      const chapter = new Chapter({
        bookID: savedBook._id,
        name: item.chapterName,
        text: item.chapterMarkdown,
        createDate: new Date(),
        images: [],
        likesFromID: []
      });
      return chapter.save();
    });
    Promise.all(promises).then(() => {
      return;
    });
    Fanfik.find().then(allFanfiks => {
      res.send(allFanfiks);
    });
  });
});

// @route GET api/fanfiks
// @desc Get fanfiks list
// @access Public
router.get("/", (req, res) => {
  Fanfik.find().then(allFanfiks => {
    res.send(allFanfiks);
  });
});

// @route GET api/fanfiks/read
// @desc Read fanfik
// @access Public
router.get("/read", (req, res) => {
  const id = req.query.id;
  let readInfo = {};
  Fanfik.findOne({ _id: id })
    .then(fanfik => {
      readInfo["fanfikName"] = fanfik.fanfikName;
      readInfo["description"] = fanfik.description;
      readInfo["gener"] = fanfik.gener;
      readInfo["tags"] = fanfik.tags;
      readInfo["rating"] = fanfik.rating;
      readInfo["comments"] = fanfik.comments;
    })
    .then(() => {
      Chapter.find({ bookID: id }).then(result => {
        let chapters = [];
        result.map(chapter => {
          chapters.push(chapter);
        });
        readInfo["chapters"] = chapters;
        res.send(readInfo);
      });
    });
});

// @route GET api/fanfiks/chapters
// @desc Get all chapters
// @access Public
router.get("/chapters", (req, res) => {
  Chapter.find()
    .then(chapters => {
      res.send(chapters);
    })
});

// @route PUT api/fanfiks/rating
// @desc Get all chapters
// @access Public
router.put("/rating", (req, res) => {
  const { rating, bookID, userID } = req.body;
  const newRating = { userID, rating };
  Fanfik.findOne({ _id: bookID })
    .then(fanfik => {
      let canRate = true;
      fanfik.rating.map(rate => {
        rate.userID === userID ? canRate = false : canRate;
      })
      if(canRate) {
        Fanfik.updateOne({_id: bookID}, { $push: { rating: newRating } })
          .then(() => {
            Fanfik.find().then(resAll => res.send(resAll));
          });
      } else {
          res.status(400).json({ msg: "You already rate this fanfik" });
      }
  })
  
});

// @route Delete api/fanfiks/fanfik
// @desc Delete fanfik
// @access Private
router.delete("/fanfik", auth, (req, res) => {
  const id = req.query.id;
  Fanfik.findByIdAndDelete({_id: id})
    .then(() => {
      Chapter.deleteMany({ bookID: id })
        .then(() => res.sendStatus(200));
    })
});

module.exports = router;