const mongoose = require('mongoose');

const LessonSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    maxScore: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now()
    }

});

const Lesson = module.exports = mongoose.model('Lesson', LessonSchema);

module.exports.getLessonsByUserId = (userId) => {
    const query = {userId: userId};
    return Lesson.find(query);
}