const mongoose = require('mongoose')

// function getCurrentDate(){
//     var date = new Date()
//     var year = date.getFullYear()
//     var month = date.getMonth()
//     var today = date.getDate()
//     var hours = date.getHours()
//     var minutes = date.getMinutes()
//     var seconds = date.getSeconds()
//     var milliseconds = date.getMilliseconds()
//     return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds))
// }
var date = new Date()
var year = date.getFullYear()
var month = date.getMonth()
var today = date.getDate()
var hours = date.getHours()
var minutes = date.getMinutes()

const tradeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        ref: 'user'
        
    },
    post_name: {
        type: String,
        required: true,
        ref: 'post'
    },
    post_title:{
        type: String,
        required: true,
        ref: 'post'
    },
    post_img:{
        type: String,
        required: true,
        ref: 'post'
    },
    createAt: {
        type: String,
        default: year+"년 "+month+1+"월 "+today+"일 "+hours+":"+minutes,
    },
    // createAt: {
    //     type: String,
    //     default: getCurrentDate().toString,
    // }

})
mongoose.model("trade", tradeSchema)