const Koa = require('koa')
const app = new Koa()
const path = require('path')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const bouncer = require('koa-bouncer')
const config = require('./config')
// 链接数据库
const db = require('./db')
// 批量注册路由
const { Init } = require('./core/initRouter');

const catchError = require('./middlewares/exception')

// 全局注册错误处理函数
const errors = require('./core/http-exception')
global.errs = errors
global.config = config
// 使用错误中间件

onerror(app)
app.use(catchError)
// error handler


// middlewares
app.use(bodyparser())
   .use(bouncer.middleware())
   .use(json())
   .use(logger())
   .use(require('koa-static')(__dirname + '/public'))
   .use(views(path.join(__dirname, '/views'), {
    options: {settings: {views: path.join(__dirname, 'views')}},
    extension: 'hbs',
    map: { hbs: 'handlebars' }
  }))
 

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

Init.init(app)
// error-handling
app.on('error', (err, ctx) => {
  // console.error('server error', err, ctx)
});
module.exports = app.listen(5000, () => {
  console.log(`Listening on http://localhost:${5000}`)
})
