const crypto  = require('crypto');
const HashService   = require("../services/hash-service");

class OtpService {

    async generateOtp(){
        const otp = Math.floor(100000 + Math.random() * 900000);
        return otp;
    }

    verifyOtp(hashedOtp, data) {
        let computedHash = HashService.hashOtp(data);
        return computedHash === hashedOtp;
    }

    async sendBySms(phone, otp) {
        /* return await twilio.messages.create({
            to: phone,
            from: process.env.SMS_FROM_NUMBER,
            body: `Your codershouse OTP is ${otp}`,
        }); */
    }

}

module.exports = new OtpService();