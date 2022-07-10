const mongooes = require('mongoose')
const commentSchema = new mongooes.Schema({
    nickname: {type: String,required: true},
    content: {type: String, require: true},
    target_id: {type: String,required: true},  // 被评论人id
    target_type: {type: String,required: true} // 被评论类型
})
const Comment = mongooes.model('Comment',commentSchema)
module.exports = Comment
