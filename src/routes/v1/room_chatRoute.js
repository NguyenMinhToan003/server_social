import express from 'express'
import { room_chatController } from '~/controllers/room_chatController'
import { room_chatValidation } from '~/validations/room_chatValidation'
const Router = express.Router()
Router.route('/')
  .post(room_chatValidation.createRoomChat, room_chatController.createRoomChat)
Router.route('/:id&&:user_id')
  .get(room_chatValidation.getRoomChat, room_chatController.getRoomChat)
Router.route('/listRoomChats')
  .get(room_chatController.getListRoomChat)
export const room_chatRoute = Router