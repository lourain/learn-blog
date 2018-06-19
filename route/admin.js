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
    console.log(req.session.test)
    // console.log(req.session['admin_id'])
    if (!req.session['admin_id'] && req.url != '/login') {
        res.redirect('/admin/login')
    } else {
        next()
    }
})

router.get('/login', (req, res) => {
    console.log(req.session.test)
    // console.log(req.session['admin_id'])
    res.render('../template/admin/login.ejs')
})

router.post('/login', (req, res) => {
    req.session.test = 'test'
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
    console.log(req.session.test);
    
    res.send('nice')
})
module.exports = router