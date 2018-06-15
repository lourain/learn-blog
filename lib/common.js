const crypto = require('crypto')

module.exports = {
    md5:function (str) {
        var hash = crypto.createHash('md5')
        hash.update(str)
        console.log(hash.digest('hex'));
        
    }
}