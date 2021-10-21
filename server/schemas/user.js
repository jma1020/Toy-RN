const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        validate:[
            function(password){
                return password.length >=8
            },
            "비밀번호는 8자 이상이여야 합니다."
        ]
    },
    name: {
        type: String,
        required: true,
    },
    profile_img: {
        type: String,
        default: "https://res.cloudinary.com/toyshare/image/upload/v1607520747/Sample_User_Icon_ygcxth.png",
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
})
mongoose.model("user", userSchema)