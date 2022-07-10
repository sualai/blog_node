const ArticleModel = require('../models/ArticleModel')
const { Resolve } = require('../lib/helper')
const { articleValidator } = require('../validators/article')

const res = new Resolve()


class ArticleController {
    static async createArticle(ctx,next) {
        articleValidator(ctx)
        const { title } = ctx.request.body
        const isSave = await ArticleModel.findOne({title})
        if (isSave) {
            throw new global.errs.Existing('文章已创建')
        }
        const article = await ArticleModel.create(ctx.request.body)
        ctx.body = res.json(article)
    }
    static async getArticleList(ctx, next) {
        // 获取参数
        let { category_id = null, pageIndex = 1,pageSize = 4, keyword } = ctx.query
        const filter = {}
        if(category_id) {
            filter.category_id = category_id
        }
        pageIndex = parseInt(pageIndex)
        pageSize = parseInt(pageSize)
        const total = await ArticleModel.find().count()
        const articleList = await ArticleModel.find()
                                               .where(filter)
                                               .skip((pageIndex - 1) * pageSize)
                                               .limit(pageSize)
                                               .or([
                                                   {keyword: {$regex: new RegExp(keyword,'i')}}
                                               ])
                                               .sort({_id: -1})
                                               .populate('category_id')
        const data = {
            articleList,
            currentPage: pageIndex,
            total,
            pageSize
        }
        ctx.body = res.json(data)
    }
    static async updateArticle(ctx,next) {
        articleValidator(ctx)
        const _id = ctx.params._id
        const isExit = await ArticleModel.findByIdAndUpdate({_id}, ctx.request.body)
        if(!isExit) {
            throw new global.errs.NotFound('找不到要更新的文章')
        }
        ctx.body = res.success('更新成功')
    }
    static async getArticle(ctx,next) {
        const _id = ctx.params._id
        const article = await ArticleModel.findById({_id}).populate('category_id')
        if(!article) {
            throw new global.errs.NotFound('找不到相关文章')
        }
        ctx.body = res.json(article)
    }
    static async deleteArticle(ctx,next) {
        const _id = ctx.params._id
        const article = await ArticleModel.findByIdAndDelete({_id})
        if(!article) {
            throw new global.errs.NotFound('找不到相关文章')
        }
        ctx.body = res.success("文章删除成功")
    }
}
module.exports =  ArticleController