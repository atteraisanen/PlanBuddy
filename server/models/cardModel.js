const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: false
  },
  user_id: {
    type: String,
    required: false
  }
}, { timestamps: true })

module.exports = mongoose.model('Card', cardSchema)