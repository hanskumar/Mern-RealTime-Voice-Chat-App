const crypto = require('crypto');


class HashService {

    hashOtp(data){
        return crypto
            .createHmac('sha256', process.env.OTP_HASH_SECRETE)
            .update(data)
            .digest('hex');
    }
}

module.exports = new HashService();