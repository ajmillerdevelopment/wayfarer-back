const db = require('../models');

const show = (req, res) => {
    db.Post.findById(req.params.postid, (err, foundPost) => {
        if (err) return console.log(err);

        res.json(foundPost);
    });
};

const showComment = (req, res) => {
    db.Comment.findById(req.params.commentid, (err, foundComment) => {
        if (err) throw err
        res.json(foundComment)
    })
}

module.exports = {
    show,
    showComment,
};