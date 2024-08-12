const router = require('express').Router();

const autobot_controller = require('../controllers/autobot_controller');

router.get('/autobots', autobot_controller.getAllAutobots);

router.post('/autobots', autobot_controller.createAutobot);

module.exports = router;
