
const User = require('../models/User');

const updateScrolled = async (req, res) => {
  try {
    const user = await User.findOne(({uid: req.body.userUid}));
    if (user !== null) {
      const filter = {uid: req.body.userUid};
      const update = {uid: req.body.userUid,
        hasScrolledToImage: req.body.scrolled};
      await User.findOneAndUpdate(filter, update, {
        returnOriginal: false,
      });
      return res.status(200).json({
        info: 'Succesfully updated user\'s profile'});
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({error: 'Update failed'});
  }
};

module.exports = {
  updateScrolled,
};
