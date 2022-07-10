const Router = require('koa-router')
const router = new Router()
const CommentController = require('../controller/comment')
const jwtAuth = require('koa-jwt')
const secretKey = global.config.security.secretKey

router.prefix('/api/v1')
// comment
router.post('/comment',jwtAuth({secret: secretKey}), CommentController.createComment)
router.get('/comment',jwtAuth({secret: secretKey}), CommentController.getCommentList)
router.get('/comment/:_id',jwtAuth({secret: secretKey}), CommentController.getComment)
router.put('/comment/:_id',jwtAuth({secret: secretKey}), CommentController.updateComment)
router.delete('/comment/:_id',jwtAuth({secret: secretKey}), CommentController.deleteComment)
module.exports = router