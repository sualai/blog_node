const mongoose = require('mongoose')
const moment = require('moment')

const AdvertiseSchema = new mongoose.Schema({
    title: {type:String,required: true},
    link:{type: String,required: true},
    createAt:{
        type: Date,
        required: true,
        default: Date.now,
        get(val){
            return moment(val).format('YYYY-MM-DD HH:mm:ss')
        }
    },
})
AdvertiseSchema.set('toJSON',{getters: true})
module.exports = mongoose.model('Advertise', AdvertiseSchema)