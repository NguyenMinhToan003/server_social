/**
 * @swagger
 */
import { env } from '~/config/environment'
import { WHITELIST_DOMAINS } from '~/utils/constants'
export const corsOptions = {
  origin: function (origin, callback) {
    if (WHITELIST_DOMAINS.includes(origin) || env.BUILD_MODE === 'dev') {
      return callback(null, true)
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true
}