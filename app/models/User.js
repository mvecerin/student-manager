const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByEmail = (email, callback) => {
    const query = {email: email};
    User.findOne(query, callback);
}

module.exports.addUser = (newUser, callback) => {
    bcrypt.hash(newUser.password, 10, (err, hash) => {
        if(err) {
            throw err;
        }
        newUser.password = hash;
        newUser.save(callback);
    });
}

module.exports.comparePassword = (pass, hash, callback) => {
    bcrypt.compare(pass, hash, (err, result) => {
      if(err) {
        throw err;
      }
      callback(null, result);
    });
}
