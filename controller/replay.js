const { replyValidator } = require('../validators/replay')
const CommentModel = require('../models/CommentModel')
const ReplyModel = require('../models/ReplyModel')
const { Resolve } = require('../lib/helper')
const res = new Resolve()
class ReplyController {
    static async createReply(ctx, next) {
        replyValidator(ctx)
        const {comment_id} = ctx.request.body
        const comment = await CommentModel.findById({_id: comment_id})
        if(!comment) {
            throw new global.errs.NotFound('找不到相关评论')
        }
        const replay = await ReplyModel.create(ctx.request.body)
        ctx.body = res.success('回复成功')
    }
    static async getReplyList(ctx,next) {
        const comment_id = ctx.params.comment_id
        const comment = await CommentModel.findById({_id: comment_id})
        if(!comment) {
            throw new global.errs.NotFound('找不到相关评论')
        }
        const replyList = await ReplyModel.find({comment_id}).sort({'_id': -1})
        ctx.body = res.json(replyList)
    }
}
module.exports = ReplyController