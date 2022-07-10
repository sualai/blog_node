function commentValidator(ctx) {
    ctx.validateBody('nickname')
        .required('评论⼈名字 nickname不能为空')
        .isString()
        .trim()
    ctx.validateBody('content')
        .required('评论内容不能为空')
        .isString()
        .trim()
    ctx.validateBody('target_id')
        .required('被评论者id target_id不能为空')
        .isString()
        .trim()
    ctx.validateBody('target_type')
        .required('被评论类型target_type不能为空')
        .isString()
        .trim()
}

module.exports = {
    commentValidator
}