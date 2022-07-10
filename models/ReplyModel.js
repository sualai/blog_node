const mongooes = require('mongoose')
const moment = require('moment')

const ReplySchema = new mongooes.Schema({
    nickname: {tyoe: String,required: true},
    content: {type: String, require: true},
    createAt:{
        type: Date,
        required: true,
        default:Date.now,
        get(val){
            return moment(val).format('YYYY-MM-DD')
        }
    },
    comment_id: {
        type: mongooes.Types.ObjectId,
        ref: 'Comment'
    }
})
// 使用get 的配置
ReplySchema.set('toJSON',{getters: true})
module.exports = mongooes.model('Reply',ReplySchema)
