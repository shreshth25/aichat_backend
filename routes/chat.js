const express = require('express')
const chat = require('../controllers/chatController')

const chatRouter = express.Router()

chatRouter.post('', chat)


module.exports = chatRouter