/**
 * @swagger
 */
import 'dotenv/config'

export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_NAME: process.env.MONGODB_NAME,
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  LOCAL_PORT: process.env.LOCAL_PORT,
  BUILD_MODE: process.env.BUILD_MODE || 'prod',
  SIGN_SECRET: process.env.SIGN_SECRET,
  EXPIRES_IN: process.env.EXPIRES_IN,
  cloud_name: process.env.cloud_name,
  cloud_secret: process.env.cloud_api_secret,
  cloud_key: process.env.cloud_api_key
}