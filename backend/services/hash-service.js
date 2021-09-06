const crypto = require('crypto');

class HashService {

    async hasOtp(data){
        const hash = createHmac('sha256', process.env.OTP_HASH_SECRETE)
        .update(data)
        .digest('hex');
    }
}

module.exports = new HashService();