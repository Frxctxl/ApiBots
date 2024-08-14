const router = require('express').Router();
const { verify } = require('jsonwebtoken');

const autobot_controller = require('../controllers/autobot_controller');

async function blockGuestAndAttachToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({
      message: 'You are not authorized for that action'
    })
  }

  try {
    const data = await verify(token, process.env.JWT_SECRET);

    req.user_id = data.user_id;

    next();
  } catch (error) {
    console.log('JWT Error', error);

    res.status(402).json({
      message: 'Your token is invalid'
    });
  }
}

router.get('/autobots', blockGuestAndAttachToken, autobot_controller.getAllAutobots);

router.get('/user', blockGuestAndAttachToken, autobot_controller.getSingleUser);

router.post('/autobots', blockGuestAndAttachToken, autobot_controller.createAutobot);

router.delete('/autobot', blockGuestAndAttachToken, autobot_controller.deleteAutobot);

module.exports = router;
