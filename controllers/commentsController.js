const db = require('../models');

const create = (req, res) => {
    const postid = req.body.post
    db.Comment.create(req.body, (err, createdComment) => {
        if (err) throw err
        db.Post.findByIdAndUpdate(postid, {$push: {comments: createdComment._id}}, (err, updatedPost) => {if (err) {throw err} res.json(updatedPost)})
        res.json(createdComment)
    })
}

const edit = (req, res) => {
    const commentid = req.body._id
    db.Comment.findByIdAndUpdate(commentid, req.body, {new: true}, (err, updatedComment) => {if (err) {throw err} res.json(updatedComment)})
}

const destroy = (req, res) => {
    const commentid = req.body._id
    const postid = req.body.postid
    db.Comment.findByIdAndDelete(commentid, (err, deletedComment) => {
        if (err) throw err
        db.Post.findByIdAndUpdate(postid, {$pull: {comments: deletedComment._id}}, {new: true}, (err, updatedPost) => {if (err) {throw err} res.json(updatedPost)})
    })
}

const show = (req, res) => {
    db.Comment.findById(req.body._id, (err, foundComment) => {
        if (err) throw err
        res.json(foundComment)
    })
}

module.exports = {
    create,
    edit,
    destroy,
    show
};