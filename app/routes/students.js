const Student = require('../models/Student');
const router = require('express').Router();
const ObjectId = require('mongoose').Types.ObjectId;

// GET /api/students
router.route('/').get(async (req, res) => {
    try {
        let userId = ObjectId(req.decoded._id);
        const data = await Student.getStudentsByUserId(userId);
        if(data) {
            res.json({success: true, data: data});
        } else {
            res.status(404).json({success: false, msg: 'Id not found'});
        }
    } catch(e) {
        res.status(500).json({success: false, msg: e.message});
    }
});
// POST /api/students
router.route('/').post(async (req, res) => {
    try {
        const posted = new Student({
            fName: req.body.fName,
            lName: req.body.lName,
            jmbag: req.body.jmbag,
            userId: ObjectId(req.decoded._id)
        });

        const result = await posted.save();
        res.json({success: true, insertId: result._id});
    } catch(e) {
        res.status(500).json({success: false, msg: e.message});
    }

// PUT /api/students
}).put(async (req, res) => {
    try {
        const posted = new Student({
            fName: req.body.fName,
            lName: req.body.lName,
            jmbag: req.body.jmbag,
            userId: ObjectId(req.decoded._id),
            _id: ObjectId(req.body._id)
        });

        const result = await Student.findByIdAndUpdate(ObjectId(req.body._id), posted, {new: true, useFindAndModify: false});
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

// DELETE /api/students/:id
router.route('/:id').delete(async (req, res) => {
    try {
        const result = await Student.findByIdAndDelete(req.params.id);
        if(result) {
            res.json({success: true});
        } else {
            res.status(404).json({success: false, msg: 'Id not found'});
        }
    } catch(e) {
        res.status(500).json({success: false, msg: e.message});
    }
});

module.exports = router;