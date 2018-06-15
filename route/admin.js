const express = require('express')
const app = express()
const router = express.Router()


router.use((req, res,next) => {
   if(!req.session['sess_id'] && req.url != '/login'){
       res.redirect('/admin/login')
   }else{
       next()
   }

})
router.use('/login',(req,res)=>{
    if(!req.body){
        res.render('../template/admin/login.ejs')
    }else{
        var username = req.body.username
        var password = req.body.password
        // db.query('')
    }

})
module.exports = router