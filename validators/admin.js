function registerValidator(ctx) {
    ctx.validateBody('nickname')
        .required('用户名是必填项')
        .isString()
        .trim()
        .isLength(3,16,'用户名必须在3~16位之间')
    ctx.validateBody('password')
        .required('密码是必填项')
        .isLength(3,16,'密码必须在3~16位之间')
        // .match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/, '密码⻓度必须在6~22位之间，包含字符、数字和 _')
    ctx.validateBody('password2')
    .required('确认密码是必填项')
    .eq(ctx.vals.password, '两次密码不一致')
}

function loginValidator(ctx) {
    ctx.validateBody('nickname')
        .required('用户名是必填项')
    ctx.validateBody('password')
        .required('密码是必填项')
}

module.exports = {
    registerValidator,
    loginValidator
}