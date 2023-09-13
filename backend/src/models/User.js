const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    uid: {
      type: String,
      required: true
    },
    hasScrolledToImage: {
      type: Boolean,
      required: false,
      default: false
    },
  }, { timestamps: true })
  
  module.exports = mongoose.model('User', userSchema)