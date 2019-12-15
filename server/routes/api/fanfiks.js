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
    tags
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
// @desc get fanfiks list
// @access Public
router.get("/", (req, res) => {
  Fanfik.find().then(allFanfiks => {
    res.send(allFanfiks);
  });
});

// @route GET api/fanfiks/read
// @desc read fanfik
// @access Private
router.get("/read:id", auth, (req, res) => {
  const id = req.params.id;

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

module.exports = router;
