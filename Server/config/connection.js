const mongoose = require('mongoose')
const uri = process.env.MONGOOSE


const connectDb = async ()=>{
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
        },()=>{
            console.log('Database Connected')
        })
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {connectDb}