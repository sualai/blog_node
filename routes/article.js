const Router = require('koa-router');
const router = new Router();
const ArticleController = require('../controller/article')
const jwtAuth = require('koa-jwt')
const secretKey = global.config.security.secretKey
router.prefix('/api/v1')

router.post('/article',jwtAuth({secret: secretKey}),ArticleController.createArticle)
router.put('/article/:_id',jwtAuth({secret: secretKey}),ArticleController.updateArticle)
router.get('/article',jwtAuth({secret: secretKey}),ArticleController.getArticleList)
router.get('/article/:_id',jwtAuth({secret: secretKey}),ArticleController.getArticle)
router.delete('/article/:_id',jwtAuth({secret: secretKey}),ArticleController.deleteArticle)

module.exports = router;
