const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String, // You can store the file path of the avatar
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
