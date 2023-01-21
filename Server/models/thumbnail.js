const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({
    filename:{
        type:String,
        required:true
    },
    thumbnails:[{
        image:{
            type:String
        },
        width:{
            type:String
        },
        height:{
            type:String
        }
    }]
})

const Thumbnail = mongoose.model('thumbnails',imageSchema)
module.exports = Thumbnail