const requireDirectory = require('require-directory')
// 获取当前目录
const currentDir = process.cwd()

const path = `${currentDir}/routes`

class Init {
    static init(app) {
        requireDirectory(module,path,{
            visit: visitor
        })
        function visitor(rot) {
            // console.log(rot.routes)
            app.use(rot.routes(),rot.allowedMethods())
        }
    }
}
module.exports = {
    Init
}