const express = require('express')
var router = express.Router()
const common = require('../lib/common')
const mysql = require('mysql')

const db = mysql.createPool({
    host: '122.152.219.175',
    user: 'root',
    password: "root",
    database: 'learn'
})

router.use((req, res, next) => {
    if (!req.session['admin_id'] && req.url != '/login') {
        res.redirect('/admin/login')
    } else {
        next()
    }
})

router.get('/login', (req, res) => {
    res.render('../template/admin/login.ejs')
})

router.post('/login', (req, res) => {
    var username = req.body.username
    var password = common.md5(req.body.password + common.md5_suffix)
    db.query(`SELECT * FROM admin_table WHERE username='${username}'`, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('database is error').end()
        } else {
            if (data.length == 0) {
                res.status(400).send('no this username').end()
            } else {
                if (data[0].password === password) {
                    req.session['admin_id'] = data[0].ID;
                    res.redirect('/admin/')
                } else {
                    res.status(400).send('this password is iscorrect').end()
                }
            }
        }
    })
})
router.get('/',(req,res)=>{
    res.render('../template/admin/index.ejs',{})
})
router.get('/banners',(req,res)=>{
//删除或是修改操作
    var act = req.query.act
    var id = req.query.id 
    if(act == 'amend'){
        
    }else if(act == 'delete'){
        console.log(12313123);
        db.query(`DELETE FROM banner_table WHERE ID = '${id}'`, (err, banners) => {
            if (err) {
                console.error(err);
                res.status(500).send('database error').end()
            } else {
               res.redirect('/admin/banners').end()
            }
        })
    }
    db.query(`SELECT * FROM banner_table`,(err,banners)=>{
        if(err){
            console.error(err);
            res.status(500).send('database error').end()
        }else{
            res.render('../template/admin/banner.ejs',{banners:banners})
        }
    })
})
router.post('/banners',(req,res)=>{
    var title = req.body.title
    var description = req.body.description
    var href = req.body.href
    if(!title || !description || !href){
        res.status(400).send('参数错误').end()
    }else{
        db.query(`INSERT INTO banner_table (title,description,href) value ('${title}','${description}','${href}')`,(err,data)=>{
            if (err) {
                console.error(err);
                res.status(500).send('database error').end()
            }else{
                res.redirect('/admin/banners')
            }
        })
    }
})

module.exports = router