const mongoose = require('mongoose');

const ScoreSchema = mongoose.Schema({
    score: {
        type: Number,
        required: true,
        default: 0
    },
    userId: {
        type: mongoose.ObjectId,
        required: true
    },
    lessonId: {
        type: mongoose.ObjectId,
        required: true
    },
    studentId: {
        type: mongoose.ObjectId,
        required: true
    }
});

const Score = module.exports = mongoose.model('Score', ScoreSchema);

module.exports.getScoresByUserId = (userId) => {
    const query = {userId: userId};
    return Score.find(query);
}

module.exports.getScoresByLessonId = (lessonId) => {
    const query = {lessonId: lessonId};
    return Score.find(query);
}