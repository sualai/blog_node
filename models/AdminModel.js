const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10 // 加盐位数
const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
    nickname: {type: String, required: true},
    password: {
        type: String,
        required: true,
        set: (val)=>{
            const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR)
            const psw = bcrypt.hashSync(val, salt)
            return psw
        }
    }
})
const AdminModel = mongoose.model('Admin',adminSchema)
module.exports = AdminModel
