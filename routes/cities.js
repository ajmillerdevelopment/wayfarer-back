const router = require('express').Router();
const controllers = require('../controllers');

// '/city'

router.get('/', controllers.cities.index);

router.get('/:cityid', controllers.cities.show);

router.post('/', controllers.cities.create)

router.get('/:cityid/:postid', controllers.posts.show)

router.get('/:cityid/:postid/:commentid', controllers.posts.showComment)
// new post
// edit post
// delete post
// new comment
// edit comment
// delete comment

module.exports = router;