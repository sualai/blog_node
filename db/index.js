const mongooes = require('mongoose')
const config = require('../config')
mongooes.connect(`mongodb://localhost/${config.db.dbName}`,{ useNewUrlParser: true,useUnifiedTopology: true})
const db = mongooes.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', async ()=> {
    console.log('链接数据库成功')
})