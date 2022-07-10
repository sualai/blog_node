const mongooes = require('mongoose')
const ArticleSchema = new mongooes.Schema({
    title: {type: String,required: true},
    author: {type: String,required: true},
    description: {type: String,required: true},
    keyword: {type: String,required: true},
    content: {type: String,required: true},
    cover: {type: String,required: true}, // 封面
    category_id:{type: mongooes.Types.ObjectId,ref: 'Category'}
},
{ timestamps: { createdAt: 'created',updatedAt: 'updated' }} 
)
const ArticleModel = mongooes.model('Article', ArticleSchema)
module.exports = ArticleModel