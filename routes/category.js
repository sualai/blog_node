const Router = require('koa-router')
const router = new Router()
const jwtAuth = require('koa-jwt')
const secretKey = global.config.security.secretKey
const CategoryController = require('../controller/category')
router.prefix('/api/v1')
router.post('/category',jwtAuth({secret: secretKey}), CategoryController.createCategory)
router.get('/category',jwtAuth({secret: secretKey}), CategoryController.getCategoryList)
router.put('/category/:_id',jwtAuth({secret: secretKey}), CategoryController.updateCategory)
router.delete('/category/:_id',jwtAuth({secret: secretKey}), CategoryController.deleteCategory)
module.exports = router