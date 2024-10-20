import express from 'express'
import { notificationValidation } from '~/validations/notificationValidation'
import { notificationController } from '~/controllers/notificationController'
const router = express.Router()

router.route('/:user_id')
  .get(notificationValidation.getNotification, notificationController.getNotification)
router.route('/inviteGroupChat')
  .post(notificationValidation.inviteGroupChat, notificationController.inviteGroupChat)
router.route('/rectifyInviteGroupChat')
  .post(
    notificationValidation.rectifyInviteGroupChat,
    notificationController.rectifyInviteGroupChat)

export const notificationRoute = router