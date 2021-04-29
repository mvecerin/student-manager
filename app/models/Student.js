const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    jmbag: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }

});

const Student = module.exports = mongoose.model('Student', StudentSchema);

module.exports.getStudentsByUserId = (userId) => {
    const query = {userId: userId};
    return Student.find(query);
}