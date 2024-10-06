import express from 'express'
import { room_chatController } from '~/controllers/room_chatController'
import { room_chatValidation } from '~/validations/room_chatValidation'

const Router = express.Router()
Router.route('/')
  .post(room_chatValidation.createRoomChat, room_chatController.createRoomChat)
  .delete(room_chatValidation.removeRoomChat, room_chatController.removeRoomChat)
Router.route('/:id&&:user_id')
  .get(room_chatValidation.getRoomChat, room_chatController.getRoomChat)
Router.route('/listRoomChats/:id')
  .get(room_chatValidation.getListRoomChat, room_chatController.getListRoomChat)
Router.route('/comfimInvite/:id')
  .post(room_chatValidation.comfimInvite, room_chatController.comfimInvite)
export const room_chatRoute = Router