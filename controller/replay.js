const { replyValidator } = require('../validators/replay')

class ReplyController {
    static async createReply(ctx, next) {
        replyValidator(ctx)
        
    }
}
module.exports = ReplyController