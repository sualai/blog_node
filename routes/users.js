const Router = require('koa-router');
const user = new Router();

// 根目录 
user.prefix('/user')

user.post('/login', async ctx=>{
    const data = ctx.request.body;
    ctx.body = {
        msg: '登录成功',
        code: 200,
        success: true,
        data,
    };
})

module.exports = user;
