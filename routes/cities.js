const router = require('express').Router();
const controllers = require('../controllers');

// '/city'

router.get('/', controllers.cities.index);

router.get('/:cityid', controllers.cities.show);

router.post('/', controllers.cities.create)

router.get('/:cityid/:postid', controllers.posts.show)

router.get('/:cityid/:postid/:commentid', controllers.posts.showComment)

router.post('/:cityid/', controllers.posts.create)

router.put('/:cityid/:postid/', controllers.posts.edit)

router.delete('/:cityid/:postid/', controllers.posts.destroy)

router.post('/:cityid/:postid/', controllers.posts.createComment)

router.put('/:cityid/:postid/:commentid/', controllers.posts.editComment)

router.delete('/:cityid/:postid/:commentid/', controllers.posts.destroyComment)

module.exports = router;