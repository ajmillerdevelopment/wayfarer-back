const db = require('../models');

const index = (req, res) => {
    db.Post.find({}, (err, allPosts) => {
        if (err) throw err;

        res.json(allPosts);
    });
};

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

const create = (req, res) => {
    const cityid = req.params.cityid
    console.log(req.body)
    db.Post.create(req.body, (err, newPost) => {
        //ADD IMAGE UPLOAD
        if (err) throw err
        db.City.findByIdAndUpdate(cityid, {$push: {posts: newPost._id}}, (err, updatedUser) => {if (err) throw err})
        //ADD TO USER
        res.json(newPost)
    })
}

const edit = (req, res) => {
    const postid = req.params.postid
    db.Post.findByIdAndUpdate(postid, req.body, {new: true}, (err, updatedPost) => {if (err) {throw err} res.json(updatedPost)})
}

const destroy = (req, res) => {
    const postid = req.params.postid
    const cityid = req.params.cityid
    db.Post.findByIdAndDelete(postid, (err, deletedPost) => {
        if (err) throw err
        db.City.findByIdAndUpdate(cityid, {$pull: {posts: deletedPost._id}}, {new: true}, (err, updatedCity) => {if (err) {throw err} res.json(updatedCity)})
    })
    
}

const createComment = (req, res) => {
    const postid = req.params.postid
    db.Comment.create(req.body, (err, createdComment) => {
        if (err) throw err
        db.Post.findByIdAndUpdate(postid, {$push: {comments: createdComment._id}}, (err, updatedPost) => {if (err) {throw err} res.json(updatedPost)})
        // res.json(createdComment)
    })
}

const editComment = (req, res) => {
    const commentid = req.params.commentid
    db.Comment.findByIdAndUpdate(commentid, req.body, {new: true}, (err, updatedComment) => {if (err) {throw err} res.json(updatedComment)})
}

const destroyComment = (req, res) => {
    const commentid = req.params.commentid
    const postid = req.params.postid
    db.Comment.findByIdAndDelete(commentid, (err, deletedComment) => {
        if (err) throw err
        db.Post.findByIdAndUpdate(postid, {$pull: {comments: deletedComment._id}}, {new: true}, (err, updatedPost) => {if (err) {throw err} res.json(updatedPost)})
    })
}

module.exports = {
    index,
    show,
    showComment,
    create,
    edit,
    destroy,
    createComment,
    editComment,
    destroyComment
};