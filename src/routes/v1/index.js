/**
 * @swagger
 */
import express from 'express'
import { userRoute } from './UserRoute'

const Router = express.Router()

Router.use('/users', userRoute)
export const APIs_V1 = Router