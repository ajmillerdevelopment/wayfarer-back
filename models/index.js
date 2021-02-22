const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/wayfarer';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

module.exports = {
    City: require('./City'),
    Comment: require('/Comment'),
    Post: require('./Post'),
    User: require('./User')
};