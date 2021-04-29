const Score = require('../models/Score');
const router = require('express').Router();
const ObjectId = require('mongoose').Types.ObjectId;

// GET /api/scores
router.route('/').get(async (req, res) => {
    try {
        let userId = ObjectId(req.decoded._id);
        const data = await Score.getScoresByUserId(userId);
        if(data) {
            res.json({success: true, data: data});
        } else {
            res.status(404).json({success: false, msg: 'Id not found'});
        }
    } catch(e) {
        res.status(500).json({success: false});
    }

// POST /api/scores
}).post(async (req, res) => {
    try {
        const posted = new Score({
            score: req.body.score,
            userId: ObjectId(req.decoded._id),
            studentId: ObjectId(req.body.studentId),
            lessonId: ObjectId(req.body.lessonId)
        });

        const result = await posted.save();
        res.json({success: true, insertId: result._id});
    } catch(e) {
        res.status(500).json({success: false, msg: e.message});
    }

// PUT /api/scores
}).put(async (req, res) => {
    try {
        const posted = new Score({
            score: req.body.score,
            studentId: ObjectId(req.body.studentId),
            lessonId: ObjectId(req.body.lessonId),
            _id: ObjectId(req.body._id)
        });

        const result = await Score.findByIdAndUpdate(ObjectId(req.body._id), posted, {new: true, useFindAndModify: false});
        if(result) {
            res.json({success: true});
        }
        else {
            res.status(404).json({success: false, msg: 'Id not found'});
        }
    } catch(e) {
        res.status(500).json({success: false, msg: e.message});
    }
});

// GET /api/scores/:id
router.route('/:id').get(async (req, res) => {
    try {
        const data = await Score.findById(req.params.id);
        if(data) {
            res.json({success: true, data: data});
        } else {
            res.status(404).json({success: false, msg: 'Id not found'});
        }
    } catch(e) {
        res.status(500).json({success: false, msg: e.message});
    }
// DELETE /api/scores/:id
}).delete(async (req, res) => {
    try {
        const result = await Score.findByIdAndDelete(req.params.id);
        if(result) {
            res.json({success: true});
        } else {
            res.status(404).json({success: false, msg: 'Id not found'});
        }
    } catch(e) {
        res.status(500).json({success: false, msg: e.message});
    }
});

// GET /api/scores/lesson/:lessonId
router.route('/lesson/:lessonId').get(async (req, res) => {
    try {
        const data = await Score.getScoresByLessonId(req.params.lessonId);
        if(data) {
            res.json({success: true, data: data});
        } else {
            res.status(404).json({success: false, msg: 'Not found'});
        }
    } catch(e) {
        res.status(500).json({success: false, msg: e.message});
    }
});

module.exports = router;