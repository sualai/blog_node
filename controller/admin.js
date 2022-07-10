const AdminModel = require('../models/AdminModel')
const { registerValidator, loginValidator } = require('../validators/admin')
const { Resolve } = require('../lib/helper')
const bcrypt = require('bcrypt')
const { generateToken } = require('../core/utils')
const res = new Resolve()
class AdminController {
    static async register (ctx, next) {
        registerValidator(ctx)
        const { nickname, password, password2 } = ctx.request.body
        const adminUser = await AdminModel.findOne({nickname: ctx.vals.nickname})
        if (adminUser) {
            throw new global.errs.Existing('用户已存在', 900)
        }
        const amdin = await AdminModel.create({
            nickname,
            password
        })
        ctx.status = 200
        ctx.body = {
            code: 200,
            message: '注册成功',
            data: amdin
        }
    }
    static async login(ctx, next) {
        loginValidator(ctx)
        const { nickname, password } = ctx.request.body
        const adminUser = await AdminModel.findOne({nickname: ctx.vals.nickname}).lean()
        console.log(adminUser)
        if(!adminUser) {
            throw new global.errs.AuthFailed('账号不存在，或密码不正确')
        }
        const correct = bcrypt.compare(password, adminUser.password)
        if(!correct) {
            throw new global.errs.AuthFailed('账号不存在，或密码不正确')
        }
        ctx.body = {
            nickname: adminUser.nickname,
            token: generateToken(adminUser._id)
        }
    }
    static async getAuth(ctx,next) {
        const _id = ctx.state.user.data
        let userInfo = await AdminModel.findById({_id})
        if(!userInfo) {
            throw new global.errs.AuthFailed('用户名或者密码错误')    
        }
        ctx.status = 200
        ctx.body = res.json({
            _id: userInfo._id,
            nickname: userInfo.nickname
        })
    }
}

module.exports = AdminController