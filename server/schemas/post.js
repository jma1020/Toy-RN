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

function currentDate(){
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth()
    var today = date.getDate()
    var hours = date.getHours()
    var minutes = date.getMinutes()
    return year+"년 "+month+1+"월 "+today+"일 "+hours+":"+minutes
}


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    poster: {
        type: String,
        required: true,
        ref: 'user',
    },
    poster_img: {
        type: String,
        required: true,
        ref: 'user',
    },
    picture: {
        type: String,
        required: true,
    },
    kategorie: {
        type: String,
        required: true,
    },
    createAt: {
        type: String,
        default: currentDate(),
    },
    checked: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        ref: 'user'
    },
    number: {
        type: String,
        require: true,
    }
    

    // comments: [commentSchema]
})

mongoose.model("post", postSchema)