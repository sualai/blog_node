const Router = require('koa-router');
const router = new Router();
const AdvertiseController = require('../controller/advertise')
const jwtAuth = require('koa-jwt')
const secretKey = global.config.security.secretKey
router.prefix('/api/v1')

router.post('/advertise',jwtAuth({secret: secretKey}),AdvertiseController.createAdvertise)
router.get('/advertise',jwtAuth({secret: secretKey}),AdvertiseController.getAdvertiseList)
router.get('/advertise/:_id',jwtAuth({secret: secretKey}),AdvertiseController.getAdvertise)
router.put('/advertise',jwtAuth({secret: secretKey}),AdvertiseController.updateAdvertise)
router.delete('/advertise/:_id',jwtAuth({secret: secretKey}),AdvertiseController.deleteAdvertise)

module.exports = router;