const express = require('express')

const router = express.Router()

router.get('/1.html',function (req,res) {
    res.render('../template/web/1.ejs',{a:1,b:5})
})

module.exports = router