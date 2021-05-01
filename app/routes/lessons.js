const Lesson = require("../models/Lesson");
const router = require("express").Router();
const ObjectId = require("mongoose").Types.ObjectId;

// GET /api/lessons
router
  .route("/")
  .get(async (req, res) => {
    try {
      let userId = ObjectId(req.decoded._id);
      const data = await Lesson.getLessonsByUserId(userId);
      if (data) {
        res.json({ success: true, data: data });
      } else {
        res.status(404).json({ success: false, msg: "Id not found" });
      }
    } catch (e) {
      res.status(500).json({ success: false, msg: e.message });
    }

    // POST /api/lessons
  })
  .post(async (req, res) => {
    try {
      const posted = new Lesson({
        title: req.body.title,
        maxScore: req.body.maxScore,
        userId: req.decoded._id,
        dateAdded: req.body.dateAdded,
      });

      const result = await posted.save();
      res.json({ success: true, insertId: result._id });
    } catch (e) {
      res.status(500).json({ success: false, msg: e.message });
    }

    // PUT /api/lessons
  })
  .put(async (req, res) => {
    try {
      const posted = new Lesson({
        title: req.body.title,
        maxScore: req.body.maxScore,
        _id: ObjectId(req.body._id),
      });

      const result = await Lesson.findByIdAndUpdate(
        ObjectId(req.body._id),
        posted,
        { new: true, useFindAndModify: false }
      );
      if (result) {
        res.json({ success: true });
      } else {
        res.status(404).json({ success: false, msg: "Id not found" });
      }
    } catch (e) {
      res.status(500).json({ success: false, msg: e.message });
    }
  });

// GET /api/lessons/:id
router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const data = await Lesson.findById(req.params.id);
      if (data) {
        res.json({ success: true, data: data });
      } else {
        res.status(404).json({ success: false, msg: "Id not found" });
      }
    } catch (e) {
      res.status(500).json({ success: false, msg: e.message });
    }
  })
  // DELETE /api/lessons/:id
  .delete(async (req, res) => {
    try {
      const result = await Lesson.findByIdAndDelete(req.params.id);
      if (result) {
        res.json({ success: true });
      } else {
        res.status(404).json({ success: false, msg: "Id not found" });
      }
    } catch (e) {
      res.status(500).json({ success: false, msg: e.message });
    }
  });

module.exports = router;
