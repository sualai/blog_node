function advertiseValidator(ctx) {
    ctx.validateBody('title')
        .required('广告标题标题是必填项')
        .isString()
        .trim()
    ctx.validateBody('link')
        .required('广告连接时必填项')
        .isString()
        .trim()
}
module.exports = {
    advertiseValidator
}