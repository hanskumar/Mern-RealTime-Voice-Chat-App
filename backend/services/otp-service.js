const crypto  = require('crypto');

//const { randomInt } = require('crypto');

class OtpService {

    async generateOtp(){
        const otp = crypto.randomInt(50)
        return otp;
    }

    async verifyOtp(){
        /* const otp = crypto.randomInt(1000, 9999);
        return otp; */
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