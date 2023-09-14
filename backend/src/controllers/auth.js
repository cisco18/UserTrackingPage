
const User = require('../models/User');


const handleAuth = async (req, res) => {
  try {
    const user = await User.findOne(({uid: req.body.userUid}));
    const {userUid} = req.body;
    
    if (!userUid) {
      return res.status(400).json({error: 'userUid is required'});
    }
    if (user !== null) {
      return res.status(200);
    } else {
      await User.create({uid: userUid});
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

