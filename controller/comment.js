const CommentModel = require('../models/CommentModel')
const { commentValidator} = require('../validators/comment')
const { Resolve } = require('../lib/helper')
const res = new Resolve()

class CommentController {
    static async createComment(ctx,next) {
        commentValidator(ctx)
        await CommentModel.create(ctx.request.body)
        ctx.body = res.success('评论成功')
    }
    static async getCommentList(ctx, next) {
        let {pageIndex = 1 , pageSize = 4 } = ctx.query
        const total = await CommentModel.find().count()
        pageIndex = parseInt(pageIndex)
        pageSize = parseInt(pageSize)
        const commentList = await CommentModel.find().skip((pageIndex-1)*pageSize).sort([['_id',-1]]).limit(pageSize).lean()
        
        ctx.status = 200
        const data = {
            commentList,
            currentPage: pageIndex,
            total,
            pageSize
        }
        ctx.body = res.json(data)                    

    }
    static async getComment(ctx, next) {
        const _id = ctx.params._id
        const comment = await CommentModel.findById({_id})
        if(!comment) {
            throw new global.errs.NotFound("找不到相关评论")
        }
        ctx.body = res.json(comment)

    }
    static async updateComment(ctx, next) {
        const _id = ctx.params._id
        const comment = await CommentModel.findByIdAndUpdate({_id},ctx.request.body)
        if(!comment) {
            throw new global.errs.NotFound("找不到相关评论")
        }
        ctx.body = res.success('评论更新成功')
    }
    static async deleteComment(ctx, next) {
        const _id = ctx.params._id
        const comment = await CommentModel.findByIdAndDelete({_id})
        if(!comment) {
            throw new global.errs.NotFound("找不到相关评论")
        }
        ctx.body = res.success('删除评论成功')
    }
}

module.exports = CommentController