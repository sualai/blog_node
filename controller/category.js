const CategoryModel = require('../models/CategoryModel')
const { categoryValidator } = require('../validators/category')
const { Resolve } = require('../lib/helper')
const res = new Resolve()
class CategoryController {
    static async createCategory(ctx,next) {
        categoryValidator(ctx)
        
        const { name, keyword } = ctx.request.body
        
        const isExit = await CategoryModel.findOne({ name })
        if(isExit) {
            throw new global.errs.Existing(`${isExit.name}分类已存在`)
        }
        const category = await CategoryModel.create({ name, keyword })
        
        ctx.status = 200
        ctx.body = {
            code: 200,
            message: '分类创建成功',
            data: category
        }
    }
    static async getCategoryList(ctx,next) {
        const categoryList = await CategoryModel.find()
        ctx.status = 200
        ctx.body = res.json(categoryList)
    }
    static async updateCategory(ctx,next) {
        const _id = ctx.params._id
        const {name, keyword} = ctx.request.body

        const category = await CategoryModel.findByIdAndUpdate({_id}, {name,keyword})
        if (!category) {
            throw new global.errs.NotFound('没有找到相关分类')
        }
        ctx.body = res.success('更新分类成功')
    }
    static async deleteCategory(ctx,next) {
        const _id = ctx.params._id

        const category = await CategoryModel.findByIdAndDelete({_id})
        if (!category) {
            throw new global.errs.NotFound('没有找到相关分类')
        }
        ctx.body = res.success('删除分类成功')
    }
}

module.exports = CategoryController