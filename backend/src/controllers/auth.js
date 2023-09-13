
const User = require('../models/User')



  const handleAuth = async (req, res) => {
    const user = await User.findOne(({ userUid: req.body.userUid }))

    if(user !== null){
      return res.status(200)
    }else {
    const {userUid} = req.body
    try {
      const user = await User.create({uid: userUid })
      return res.status(200)
    } catch (error) {
      console.log(error)
      return res.status(400)
    }
  }
    return 
  }



  module.exports = {
    handleAuth,
  }

