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

const create = (req, res) => {
    const cityid = req.params.cityid
    console.log(req.body)
    db.Post.create(req.body, (err, newPost) => {
        //ADD IMAGE UPLOAD
        if (err) throw err
        db.City.findByIdAndUpdate(cityid, {$push: {posts: newPost._id}}, {new: true}, (err, updatedUser) => {if (err) throw err})
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

module.exports = {
    show,
    showComment,
    create,
    edit,
    destroy,
};