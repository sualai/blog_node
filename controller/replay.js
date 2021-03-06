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
        const comment_id = ctx.query.comment_id
        const comment = await CommentModel.findById({_id: comment_id})
        if(!comment) {
            throw new global.errs.NotFound('找不到相关评论')
        }
        const replyList = await ReplyModel.find({comment_id}).sort({'_id': -1})
        ctx.body = res.json(replyList)
    }
    static async getReply(ctx,next) {
        const _id = ctx.params._id
        const replay = await ReplyModel.findById(_id)
        if(!replay) {
            throw new global.errs.NotFound('找不到相关回复')
        }
        ctx.body = res.json(replay)
    }
    static async updateReply(ctx,next) {
        replyValidator(ctx)
        const _id = ctx.request.body._id
        const replay = await ReplyModel.findByIdAndUpdate(_id,ctx.request.body)
        if(!replay) {
            throw new global.errs.NotFound('找不到相关回复')
        }

        ctx.body = res.success('更新成功')
    }
    static async deleteReply(ctx,next) {
        const _id = ctx.params._id
        const replay = await ReplyModel.findByIdAndDelete(_id)
        if(!replay) {
            throw new global.errs.NotFound('找不到相关回复')
        }

        ctx.body = res.success('删除成功')
    }
}
module.exports = ReplyController