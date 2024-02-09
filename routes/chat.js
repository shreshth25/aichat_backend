const express = require('express')
const {chat, analyzeEmotion, analyzeStory} = require('../controllers/chatController')

const chatRouter = express.Router()

chatRouter.post('', chat)
chatRouter.post('/analyze', analyzeEmotion)
chatRouter.post('/story', analyzeStory)


module.exports = chatRouter