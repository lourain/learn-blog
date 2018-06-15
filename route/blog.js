const express = require('express')

const app = express()
const router = express.Router()

router.get('/1.html', function (req, res) {
    res.send('this is alse blog')
})

module.exports = router