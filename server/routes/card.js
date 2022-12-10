const express = require('express')
const {
  createCard,
  getCards,
  getCard,
  deleteCard,
  updateCard,
  updatePriority
} = require('../controllers/cardController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/', getCards)

router.get('/:id', getCard)

router.post('/', createCard)

router.delete('/:id', deleteCard)

router.put('/:id', updateCard)


module.exports = router