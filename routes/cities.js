const router = require('express').Router();
const controllers = require('../controllers');

// '/city'

router.get('/', controllers.cities.index);

router.get('/:id', controllers.cities.show);

module.exports = router;