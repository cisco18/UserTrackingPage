
const User = require('../models/User')

  const getAllUsers = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1})
  
    res.status(200).json(users)
  }

  
  module.exports = {
    getAllUsers
  }