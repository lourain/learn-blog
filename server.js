const express = require('express')
const mysql = require('mysql')
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const bodyParser = require('body-parser')
const consolidate = require('consolidate')

const app = express()
const admin_router = require('./route/admin')
const web_router = require('./route/web')
const article_router = require('./route/article')
const blog_router = require('./route/blog')
//1.获取请求数据
app.use(bodyParser.urlencoded({extended:false}))
var db = mysql.createPool({
    host:'http://122.152.219.175',
    user: 'root',
    password: 'wsxrk007',
    database: 'learn'
})
//2.cookie session
app.use(cookieParser('luyw'))
{
    let keys = []
    for (let index = 0; index < 1000; index++) {
        keys.push(Math.random() * 1000)
    }
    app.use(cookieSession({
        name: 'sess_id',
        keys: keys,
        maxAge: 20 * 60 * 1000
    }))
}

//3.模板
app.engine('html',consolidate.ejs)
app.set('view engine','html')
app.set('views','template')

//4.router
app.use('/admin',admin_router)
app.use('/web',web_router)
app.use('/article',article_router)
app.use('/blog',blog_router)

//5.static
app.use(express.static('./static'))

app.listen(3000)