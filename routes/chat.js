const express = require('express')
const {chat, analyzeEmotion} = require('../controllers/chatController')

const chatRouter = express.Router()

chatRouter.post('', chat)
chatRouter.post('/analyze', analyzeEmotion)


module.exports = chatRouter