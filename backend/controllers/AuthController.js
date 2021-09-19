const apiResponse   = require("../services/ApiResponse");
const UserModel     = require("../models/UserModel");
const OtpService    = require("../services/otp-service");
const HashService   = require("../services/hash-service");
const crypto        = require('crypto');
const userService   = require("../services/user-service");
const tokenService  = require('../services/jwttoken-service');
const UserDto = require('../dtos/user-dtos'); 

class AuthController {

    async sendOtp(req,res){

        const { phone } = req.body;
        if (!phone) {
            res.status(400).json({ message: 'Phone field is required!' });
        }

        
        const otp = await OtpService.generateOtp();

        const ttl = 1000 * 60 * 15; // 15 min
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`;
        const hash = HashService.hashOtp(data);

        // send OTP
        try {
            // await otpService.sendBySms(phone, otp);
            res.status(200).json({
                hash: `${hash}.${expires}`,
                phone,
                otp,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'message sending failed' });
        }
    }


    async verifyOtp(req,res){

            try {
                const { phone,otp,hash } = req.body;

                if (!otp || !hash || !phone) {
                    return apiResponse.validationErrorWithData(res, "All fields are required."); 
                }

                const [hashedOtp, expires] = hash.split('.');
                
                if (Date.now() > +expires) {
                    
                    return apiResponse.validationErrorWithData(res, "OTP expired!."); 
                }

                const data = `${phone}.${otp}.${expires}`;

                const isValid = OtpService.verifyOtp(hashedOtp, data);
                
                if(!isValid){
                    
                    return apiResponse.failedResponse(res,"Invalid OTP");
                }

                /*-----If OPT is valid Then first Check user if already registered then login generate JWT token otherwise insert user and login and Generate JWT token----*/
                
                let user;
                try {
                    user = await userService.findUser({ phone });
                    if (!user) {
                        user = await userService.createUser({ phone });
                    }

                    const { accessToken, refreshToken } = tokenService.generateTokens({
                        _id: user._id
                    });

                    let userData = {
                        _id: user._id,
                        phone: user.phone,
                        email: user.email,
                        role: user.role,
                        status : user.status,
                        avatar :user.avatar,
                    }

                    userData.accessToken = accessToken;
                    userData.refreshToken = refreshToken;

                    /*---------Store Refresh Token in cookies------------*/

                    await tokenService.storeRefreshToken(refreshToken,user._id);

                    res.cookie('refreshToken', refreshToken, {
                        maxAge: 1000 * 60 * 60 * 24 * 30,
                        httpOnly: true,
                    });
            
                    res.cookie('accessToken', accessToken, {
                        maxAge: 1000 * 60 * 60 * 24 * 30,
                        httpOnly: true,
                    });

                    return apiResponse.successResponseWithData(res,"Login Success.", userData);

                } catch (err) {
                    console.log(err);
                    res.status(500).json({ message: 'Db error' });
                }
                
        } catch (err) {

            console.log(err);
            return apiResponse.ErrorResponse(res, "Something went Wrong,Please Try Again.! ");
        }

    }

    async refreshToken(req,res){

        // get refresh token from cookies
        const { refreshToken } = req.cookies;

        if(!refreshToken){
            return apiResponse.validationErrorWithData(res, "No Token Found"); 
        }

        // verify refresh token
        let userdata;
        try{
            userdata = await tokenService.verifyRefreshToken(refreshToken);
        } catch(err){
            return apiResponse.unauthorizedResponse(res, "Unautharized Error");
        }

        
        // check refresh token from DB
        try{
            const token = tokenService.findRefreshToken(userdata.id,refreshToken);

            if(!token){
                return apiResponse.unauthorizedResponse(res, "No RefToken found in DB ");
            }

        } catch(err){
            return apiResponse.unauthorizedResponse(res, "Internal Error");
        }
        
        // check if valid user
        try{
            const user = userService.findUser({ _id: userdata.id });
            if (!user) {
                return res.status(404).json({ message: 'No user' });
            }

            // genrate new Accesstoken
            const { accessToken, NewrefreshToken } = tokenService.generateTokens({
                _id: userdata._id
            });

            // update refresh token
            const token = tokenService.updateRefreshToken(userdata.id,NewrefreshToken);


            // set new accessToken ,Refresh token in cookies
            res.cookie('refreshToken', NewrefreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
            });

            res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
            });

            // send response to the client
            const userDto = new UserDto(user);
            res.json({ user: userDto, auth: true });

        } catch(err){
            return apiResponse.unauthorizedResponse(res, "Internal Error");
        }
       
    }

    async logout(req,res){

    }

}

module.exports = new AuthController();