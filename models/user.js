const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
        timestamps: true
    }
);

// Telling mongoose that this is our model
const User = mongoose.model('User', userSchema);

// Finally we need to export it
module.exports = User;

