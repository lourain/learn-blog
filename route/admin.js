const express = require('express')
const app = express()
const router = express.Router()
const common = require('../lib/common')
const mysql = require('mysql')

const db = mysql.createPool({
    host: '122.152.219.175',
    user: 'root',
    password: "root",
    database: 'learn'
})

router.use((req, res, next) => {
    if (!req.session['sess_id'] && req.url != '/login') {
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
            console.log(data);

            if (data.length == 0) {
                res.status(400).send('no this username').end()
            } else {
                if (data[0].password === password) {
                    console.log(true);

                    req.session['sess_id'] = data.ID;
                    res.redirect('/admin/')
                } else {
                    res.status(400).send('this password is iscorrect').end()
                }
            }
        }
    })


})
module.exports = router