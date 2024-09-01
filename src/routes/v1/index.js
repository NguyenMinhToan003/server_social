import express from 'express'
import { userRoute } from './userRoute'
import { authRoute } from './authRoute'
import { room_chatRoute } from './room_chatRoute'
import { messageRoute } from './messageRoute'
const Router = express.Router()

Router.use('/auth', authRoute)
Router.use('/users', userRoute)
Router.use('/room_chats', room_chatRoute)
Router.use('/messages', messageRoute)

export const APIs_V1 = Router
