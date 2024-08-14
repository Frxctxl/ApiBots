const { Autobot, User } = require('../models');

module.exports = {
  async getAllAutobots(req, res) {
    const autobots = await Autobot.find();

    res.json(autobots);
  },
  async getSingleUser(req, res) {
    const user = await User.findById(req.user_id).populate('autobots')

    res.json(user);
  },
  async createAutobot(req, res) {
    const user = await User.findById(req.user_id);

    const newAutobot = await Autobot.create({
      name: req.body.name,
      color: req.body.color,
      createdBy: user._id
    });

    user.autobots.push(newAutobot._id);
    await user.save();

    res.json({
      message: 'Autobot rolled out!',
      autobot: newAutobot
    })
  },
  async deleteAutobot(req, res) {
    const user = await User.findById(req.user_id);
    const autobot_id = req.body.autobot_id;

    if (!user.autobots.includes(autobot_id)
    ) {
      return res.status(403).json({
        message: 'This is not your bot'
      });
    }

    await Autobot.deleteOne({
      _id: autobot_id
    });

    res.json({
      message: 'autobot deleted'
    });
  }
};

