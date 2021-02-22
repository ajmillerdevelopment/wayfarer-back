const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    photos: [{url: String}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})
const Post = mongoose.model('Post', postSchema)
module.exports = Post;