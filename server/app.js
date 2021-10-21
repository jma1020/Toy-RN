const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./schemas/user')
require('./schemas/post')
require('./schemas/comment')
require('./schemas/trade')
require('./schemas/love')
// require('./schemas/deal')


app.use(bodyParser.json())

const user = mongoose.model("user")
const post = mongoose.model("post")
const comment = mongoose.model("comment")
const trade =mongoose.model("trade")
const love = mongoose.model("love")
// const deal = mongoose.model("deal")

const mongoUri = "mongodb+srv://cnq:jjfc1VNOUvpUPBjb@cluster0.dq4ta.mongodb.net/<dbname>?retryWrites=true&w=majority"

mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on("connected", () => {
    console.log('connected to mongo')
})
mongoose.connection.on("error", (err) => {
    console.log('error',err)
})

app.get('/',(req,res) => {
    post.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/find-mylist',(req,res) => {
    post.find({poster:req.body.poster})
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})


app.post('/send-data',(req,res) => {
    const userData = new user({
        user_id: req.body.user_id,
        password: req.body.password,
        name: req.body.name,
        phone: req.body.phone,
        birthday: req.body.birthday,
        gender: req.body.gender 
    })
    userData.save()
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/delete',(req,res) => {
    user.findByIdAndRemove(req.body.id)
    .then(data=>{
        console.log(data)
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
    })
})

app.listen(3000,()=>{
    console.log("server running")
})

app.post('/update',(req,res)=>{
    user.findByIdAndUpdate(req.body.id,{
        user_id: req.body.user_id,
        password: req.body.password,
        name: req.body.name,
        profile_img: req.body.profile_img
    }).then(data=>{
        console.log(data)
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
    })
})

app.post('/login',(req,res) => {
    user.find({$and:[{"user_id": req.body.user_id},{ "password": req.body.password}]})
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/post-data',(req,res) => {
    function currentDate(){
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth()
        var today = date.getDate()
        var hours = date.getHours()
        var minutes = date.getMinutes()
        return year+"년 "+month+1+"월 "+today+"일 "+hours+":"+minutes
    }
    const postData = new post({
        title: req.body.title,
        content: req.body.content,
        poster: req.body.poster,
        poster_img: req.body.poster_img,
        picture: req.body.picture,
        kategorie: req.body.kategorie,
        checked: req.body.checked,
        phone: req.body.phone,
        number: req.body.number,
        createAt: currentDate()
    })
    postData.save()
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/comment', (req,res) => {
    function currentDate(){
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth()
        var today = date.getDate()
        var hours = date.getHours()
        var minutes = date.getMinutes()
        return year+"년 "+month+1+"월 "+today+"일 "+hours+":"+minutes
    }
    const commentData = new comment({
        name: req.body.name,
        comment_content: req.body.comment_content,
        post_id: req.body.id,
        comment_profile: req.body.comment_profile,
        createAt: currentDate()
    })
    commentData.save()
    .then(data=>{
        console.log(data)
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
    })
})

app.post('/comment-data',(req,res) => {
    comment.find({"post_id": req.body.id})
    .then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})
app.post('/find-title',(req,res) => {
    post.find({title:{$regex:req.body.title}})
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/find-kategorie',(req,res) => {
    post.find({$and:[{title:{$regex:req.body.title}},{kategorie:req.body.kategorie}]})
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/trade-data',(req,res) => {
    function currentDate(){
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth()
        var today = date.getDate()
        var hours = date.getHours()
        var minutes = date.getMinutes()
        return year+"년 "+month+1+"월 "+today+"일 "+hours+":"+minutes
    }
    const tradeData = new trade({
        name: req.body.name,
        post_name:req.body.post_name,
        post_title:req.body.post_title,
        post_img:req.body.post_img,
        createAt:currentDate()
    })
    tradeData.save()
    .then(data=>{
        console.log(data)
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
    })
})
//post에 아이디도 가져와서 그 post 고유의 아이디가 존재하는거면 안들어가게끔                아니다 삭제를 하자

app.post('/remove-trade',(req,res) => {
    trade.findOneAndRemove(req.body.post_title)
    .then(data=>{
        console.log(data)
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
    })
})

app.post('/find-mytrade',(req,res) => {
    trade.find({name:req.body.name})
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/love-data',(req,res) => {
    function currentDate(){
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth()
        var today = date.getDate()
        var hours = date.getHours()
        var minutes = date.getMinutes()
        return year+"년 "+month+1+"월 "+today+"일 "+hours+":"+minutes
    }
    const loveData = new love({
        name: req.body.name,
        lovepost_name:req.body.lovepost_name,
        lovepost_title:req.body.lovepost_title,
        lovepost_img:req.body.lovepost_img,
        createAt:currentDate()
    })
    loveData.save()
    .then(data=>{
        console.log(data)
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
    })
})

app.post('/remove-love',(req,res) => {
    love.findOneAndRemove(req.body.lovepost_title)
    .then(data=>{
        console.log(data)
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
    })
})

app.post('/find-mylove',(req,res) => {
    love.find({name:req.body.name})
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/kategorie',(req,res) => {
    post.find({kategorie:req.body.kategorie})
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

// app.post('/trade',(req,res)=>{
//     post.findByIdAndUpdate(req.body.id,{
        
//         tradebool:req.body.tradebool,
//         tradename:req.body.tradename
      
//     }).then(data=>{
//         console.log(data)
//         res.send(data)
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })

// app.post('/love',(req,res)=>{
//     post.findOneAndUpdate("req.body.title",{
//             lovename:req.body.lovename
//     }).then(data=>{
//         console.log(data)
//         res.send(data)
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })


// app.post('/deal-apply',(req,res) => {
//     const dealData = new deal({
//         poster: req.body.poster,
//         applicant: req.body.applicant,
//         applicant_img: req.body.applicant_img,
//         post_id: req.body.post_id,
//         title: req.body.title,
//         picture: req.body.picture     
//     })
//     dealData.save()
//     .then(data=>{
//         console.log(data)
//         res.send(data)
//     }).catch(err=>{
//         console.log(err)
//     })
// })

// app.post('/login/user-data',(req,res) => {
//     user.find({$and:[{"user_id": req.body.user_id},{ "password": req.body.password}]})
//     .then(data=>{
//         console.log(data)
//         res.send(data)
//     }).catch(err=>{
//         console.log(err)
//     })
// })

    // "name": "홍길동",
    // "position":"의적",
    // "phone":"01026958294",
    // "email": "fltodn@naver.com",
    // "salary": "2800000",
    // "picture": "http://placeimg.com/200/200/5"

    app.post('/user-update',(req,res)=>{
    user.findByIdAndUpdate(req.body.id,{
        name:req.body.name
    }).then(data=>{
        console.log(data)
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
    })
})