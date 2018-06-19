const crypto = require('crypto')

module.exports = {
    md5_suffix:'sfas234klpiP$@$%:Jjllauif路附近案例的RE惹急了（）#￥#￥#43sdf发s',
    md5:function (str) {
        var hash = crypto.createHash('md5')
        hash.update(str)
        return hash.digest('hex')
    },
    isEmptyObj:function (obj) {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj,key)) {
                return false                
            }else{
                return true
            }
        }
    }
    
}