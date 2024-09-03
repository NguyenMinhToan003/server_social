import jwt from 'jsonwebtoken'
import { env } from '~/config/environment'
import { StatusCodes } from 'http-status-codes'

const nonSecurePaths = []

const createToken = (payload) => {
  let token = null
  const key = env.SIGN_SECRET
  try {
    token = jwt.sign(payload, key, { expiresIn: env.EXPIRES_IN })
  } catch (error) {
    throw new Error(error)
  }
  return token
}

const verifyToken = (token) => {
  const key = env.SIGN_SECRET
  let decoded = null
  try {
    decoded = jwt.verify(token, key)
  } catch (error) {
    throw new Error(error)
  }
  return decoded
}

const checkJWTToken = async (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next()
  const token = req.headers.authorization.split(' ')[1] || req.cookies.token
  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' })
  try {
    const decoded = verifyToken(token)
    req.user = { ...decoded }
    next()
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'expire login ' })
  }
}

export { createToken, verifyToken, checkJWTToken }
