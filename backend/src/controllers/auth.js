
const User = require('../models/User');


const handleAuth = async (req, res) => {
  await User.findOne(({uid: req.body.uidStorage}));
  try {
    const {uidStorage} = req.body;
    if (!uidStorage) {
      return res.status(400).json({error: 'userUid is required'});
    }
    const user = await User.findOne({uid: uidStorage});

    if (user !== null) {
      return res.status(200);
    } else {
      await User.create({uid: uidStorage});
      return res.status(200);
    }
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};


module.exports = {
  handleAuth,
};

