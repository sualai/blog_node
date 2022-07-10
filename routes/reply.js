const Router = require('koa-router')
const router = new Router()
const ReplyController = require('../controller/replay')
const jwtAuth = require('koa-jwt')
const secretKey = global.config.security.secretKey

router.prefix('/api/v1')
// comment
router.post('/reply',jwtAuth({secret: secretKey}), ReplyController.createReply)
router.get('/reply/:comment_id',jwtAuth({secret: secretKey}), ReplyController.getReplyList)
module.exports = router