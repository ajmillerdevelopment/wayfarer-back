const db = require('../models');

const index = (req, res) => {
    db.Post.find({}, (err, allPosts) => {
        if (err) throw err;

        res.json(allPosts);
    });
};

const show = (req, res) => {
    db.Post.findById(req.body._id, (err, foundPost) => {
        if (err) return console.log(err);

        res.json(foundPost);
    });
};

const create = (req, res) => {
    //INCLUDE CITY ID IN FORM DATA
    const cityid = req.body.city
    db.Post.create(req.body, (err, newPost) => {
        //ADD IMAGE UPLOAD
        if (err) throw err
        db.City.findByIdAndUpdate(cityid, {$push: {posts: newPost._id}}, (err, updatedCity) => {if (err) {throw err} res.json(updatedCity)} )
        //ADD TO USER
        res.json(newPost)
    })
}

// const create = (req, res) => {
//     const cityid = req.body.city
//     db.City.findById(cityid, (err, foundCity) => {
//         if (err) {throw err}
//         res.json(foundCity)
//         const context = {
//             title: req.body.title,
//             body: req.body.body,
//             city: req.body.city
//         }
//         db.Post.create(context, (err, newPost) => {
//             if (err) throw err
//             foundCity.posts.push(newPost._id)
//             res.json(newPost)
//         })
//     })
// }

const edit = (req, res) => {
    const postid = req.body._id
    db.Post.findByIdAndUpdate(postid, req.body, {new: true}, (err, updatedPost) => {if (err) {throw err} res.json(updatedPost)})
}

const destroy = (req, res) => {
    const postid = req.body._id
    const cityid = req.body.cityid
    db.Post.findByIdAndDelete(postid, (err, deletedPost) => {
        if (err) throw err
        db.Comment.deleteMany({post: deletedPost._id}, (err, deletedComments) => {if (err) {throw err} res.json(deletedComments)})
        db.City.findByIdAndUpdate(cityid, {$pull: {posts: deletedPost._id}}, {new: true}, (err, updatedCity) => {if (err) {throw err} res.json(updatedCity)})
    })
    
}

// const createComment = (req, res) => {
//     const postid = req.body.post
//     db.Comment.create(req.body, (err, createdComment) => {
//         if (err) throw err
//         db.Post.findByIdAndUpdate(postid, {$push: {comments: createdComment._id}}, (err, updatedPost) => {if (err) {throw err} res.json(updatedPost)})
//         // res.json(createdComment)
//     })
// }

// const editComment = (req, res) => {
//     const commentid = req.body._id
//     db.Comment.findByIdAndUpdate(commentid, req.body, {new: true}, (err, updatedComment) => {if (err) {throw err} res.json(updatedComment)})
// }

// const destroyComment = (req, res) => {
//     const commentid = req.body._id
//     const postid = req.body.postid
//     db.Comment.findByIdAndDelete(commentid, (err, deletedComment) => {
//         if (err) throw err
//         db.Post.findByIdAndUpdate(postid, {$pull: {comments: deletedComment._id}}, {new: true}, (err, updatedPost) => {if (err) {throw err} res.json(updatedPost)})
//     })
// }

module.exports = {
    index,
    show,
    showComment,
    create,
    edit,
    destroy,
};