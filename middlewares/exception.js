const {HttpException} = require('../core/http-exception')
const bouncer = require('koa-bouncer')
const catchError = async (ctx,next)=>{
    try {
        await next()
    } catch(error) {
        console.log(error)
        if (error instanceof bouncer.ValidationError){
            ctx.body = {
                name: error.name,
                message: error.message,
                request: `${ctx.method} ${ctx.path}`
            }
            return
        }
        // 401 权限错误处理
        if(error.status === 401) {
            ctx.status = 401
            ctx.body = {
                code: error.status,
                message: error.originalError?error.originalError.message:error.message,
                request: `${ctx.method} ${ctx.path}`
            }
            return
        }
        const isHttpException = error instanceof HttpException
        if(isHttpException) {
            ctx.status = error.code
            ctx.body = {
                message: error.msg,
                error: error.code,
                request: `${ctx.method} ${ctx.path}`
            }
        } else {
            // 未知错误
            ctx.body = {
                msg: '未知错误',
                code:  999,
                request: `${ctx.method} ${ctx.path}`
            }
        }
    }
}

module.exports = catchError