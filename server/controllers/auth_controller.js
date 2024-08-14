const { User } = require('../models')
const { sign, verify } = require('jsonwebtoken');

async function createToken(user_id) {
  const token = await sign({ user_id: user_id }, process.env.JWT_SECRET);

  return token;
}

module.exports = {
  async registerUser(req, res) {
    try {
      const user = await User.create(req.body);

      const token = await createToken(user._id);

      res.cookie('token', token, {
        httpOnly: true,
        // maxAge: 5 * 60 * 1000
      });
      res.json({
        user: user
      });
    } catch (error) {
      console.log('register error', error);
    }
  },
  async loginUser(req, res) {
    const user = await User.findOne({
      email: req.body.email
    });

    if (!user) {
      return res.status(403).json({
        message: 'A user with that email wasn\'t found'
      });
    }

    const valid_pass = await user.validatePassword(req.body.password);

    if (!valid_pass) {
      return res.status(401).json({
        message: "That password is incorrect"
      });
    }

    const token = await createToken(user._id);

    res.cookie('token', token, {
      httpOnly: true,
    })

    res.json({
      message: "Logged in"
    })
  }
}
