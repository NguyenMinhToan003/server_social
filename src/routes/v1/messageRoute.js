import express from 'express'
const Router = express.Router()
const { messageController } = require('~/controllers/messageController')
const { messageValidation } = require('~/validations/messageValidation')
Router.route('/')
  .post(messageValidation.createMessage, messageController.createMessage)

Router.route('/:room_chat_id&&:user_id')
  .get(messageValidation.getMessages, messageController.getMessages)
Router.route('/:id')
  .put(messageValidation.removeMessageById, messageController.removeMessageById)
export const messageRoute = Router
