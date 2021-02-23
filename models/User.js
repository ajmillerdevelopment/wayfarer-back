const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    avatar: {type: String}, //URL
    password: {type: String, required: true},
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
});
const User = mongoose.model('User', userSchema)
module.exports = User;