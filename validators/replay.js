function replyValidator(ctx) {
    ctx.validateBody('nickname')
        .required('回复人名称不能为空')
        .isString()
        .trim()
    ctx.validateBody('content')
        .required('回复内容不能为空')
        .isString()
        .trim()
    ctx.validateBody('comment_id')
        .required('评论人id不能为空')
        .isString()
        .trim()
}
module.exports = {
    replyValidator
}