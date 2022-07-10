const AdminController = require('../controller/admin')
const Router = require('koa-router');
const router = new Router();
const jwtAuth = require('koa-jwt')
const secretKey = global.config.security.secretKey
// 根目录 
router.prefix('/api/v1/admin')

router.post('/register', AdminController.register)
router.post('/login', AdminController.login)
router.post('/auth',jwtAuth({secret: secretKey}), AdminController.getAuth)

module.exports = router