function categoryValidator(ctx) {
    ctx.validateBody('name')
        .required('分类名称是必填项')
    ctx.validateBody('keyword')
        .required('分类关键词是必填项')
}
module.exports = {
    categoryValidator
}