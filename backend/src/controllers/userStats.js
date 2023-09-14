const User = require('../models/User');

const getStats = async (req, res) => {
  try {
    const allUsers = await User.find({});
    const scrolledUsers = await User.find({ hasScrolledToImage: true });

    const userCount = allUsers.length;
    const scrolledUserCount = scrolledUsers.length;

    return res.status(200).json({
      totalUsers: userCount,
      scrolledUsersCount: scrolledUserCount,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getStats,
};