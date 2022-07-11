const AdvertiseModel = require('../models/AdvertiseModel')
const {advertiseValidator} =require('../validators/advertise')
const { Resolve } = require('../lib/helper')
const res = new Resolve()

class AdvertiseController {
    static async createAdvertise(ctx,next) {
        advertiseValidator(ctx)
        const {title} = ctx.request.body
        const isExit = await AdvertiseModel.findOne({title})
        if(isExit) {
            throw new global.errs.Existing('广告已存在，无需重复添加')
        }
        const advertise = await AdvertiseModel.create(ctx.request.body)
        ctx.body = res.json(advertise)
    }
    static async getAdvertiseList(ctx,next) {
        const adList = await AdvertiseModel.find().sort({_id: -1})
        ctx.body = res.json(adList)

    }
    static async getAdvertise(ctx,next) {
        const _id = ctx.params._id
        const ad = await AdvertiseModel.findById(_id)
        if (!ad) {
            throw new global.errs.NotFound('找不到相关广告') 
        }
        ctx.body = res.json(ad)
    }
    static async updateAdvertise(ctx,next) {
        advertiseValidator(ctx)
        const {_id} = ctx.request.body
        const isExit = await AdvertiseModel.findByIdAndUpdate(_id, ctx.request.body)
        if(!isExit) {
            throw new global.errs.Existing('找不到相关广告')
        }
        ctx.body = res.success('更新成功')
    }
    static async deleteAdvertise(ctx,next) {
        const _id = ctx.params._id
        const ad = await AdvertiseModel.findByIdAndDelete(_id)
        if (!ad) {
            throw new global.errs.NotFound('找不到相关广告') 
        }
        ctx.body = res.success('删除成功')
    }
}

module.exports = AdvertiseController
