/**
 * @swagger
 */
import { env } from '~/config/environment'
export const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true)
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true
}