const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    country: {type: String, required: true},
    image: {url: String}
});
const City = mongoose.model('City', citySchema)
module.exports = City;