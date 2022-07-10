function articleValidator(ctx) {
    ctx.validateBody('title')
        .required('文章标题是必填项')
        .isString()
        .trim()
    ctx.validateBody('author')
        .required('文章作者是必填项')
        .isString()
        .trim()
    ctx.validateBody('description')
        .required('文章简介是必填项')
        .isString()
        .trim()
    ctx.validateBody('keyword')
        .required('文章关键词是必填项')
        .isString()
        .trim()
    ctx.validateBody('description')
        .required('文章简介是必填项')
        .isString()
        .trim()
    ctx.validateBody('content')
        .required('文章内容是必填项')
        .isString()
        .trim()
    ctx.validateBody('category_id')
        .required('文章分类id是必填项')
        .isString()
        .trim()
}

module.exports = {
    articleValidator
}