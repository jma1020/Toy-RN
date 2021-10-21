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

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        ref: 'user'
        
    },
    comment_content: {
        type: String,
        required: true,
    },
    post_id: {
        type: String,
        required: true,
        ref: 'post'
    },
    // createAt: {
    //     type: String,
    //     default: getCurrentDate().toString,
    // }
    createAt: {
        type: String,
        default: year+"년 "+month+1+"월 "+today+"일 "+hours+":"+minutes,
    },
    comment_profile: {
        type: String,
        required: true
    }
})
mongoose.model("comment", commentSchema)