const Card = require('../models/cardModel')
const mongoose = require('mongoose')

const getCards = async (req, res) => {
  const user_id = req.user._id

  const cards = await Card.find({user_id}).sort({createdAt: -1})

  res.status(200).json(cards)
}

const getCard = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such card'})
  }

  const card = await Card.findById(id)

  if (!card) {
    return res.status(404).json({error: 'No such card'})
  }
  
  res.status(200).json(card)
}


const createCard = async (req, res) => {
  const {title, date} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const card = await Card.create({title, date, user_id})
    res.status(200).json(card)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const deleteCard = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such card'})
  }

  const card = await Card.findOneAndDelete({_id: id})

  if (!card) {
    return res.status(400).json({error: 'No such card'})
  }

  res.status(200).json(card)
}

const updateCard = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such card'})
  }

  const card = await Card.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!card) {
    return res.status(400).json({error: 'No such card'})
  }

  res.status(200).json(card)
}


module.exports = {
  getCards,
  getCard,
  createCard,
  deleteCard,
  updateCard
}