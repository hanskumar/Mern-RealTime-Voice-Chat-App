const apiResponse   = require("../services/ApiResponse");
const UserModel     = require("../models/UserModel");
const bcrypt        = require('bcrypt');
var uniqid          = require('uniqid');
const OtpService    = require("../services/otp-service");
const HashService   = require("../services/hash-service");
const crypto        = require('crypto');
const userService   = require("../services/user-service");


const {authSchema,profileSchema,RegistrationSchema,ChangePasswordSchema} =  require("../validation/validation_schema");

const { loginAccessToken,signAccessToken,signRefreshToken } = require('../config/JwtToken')



exports.sendOtp = async (req, res,next) => {

    try {
            const { phone } = req.body;

            if(!phone){
                return apiResponse.validationErrorWithData(res, "Phone Number is mandatory."); 
            }
            
            const otp = await OtpService.generateOtp();

            const ttl = 1000 * 60 * 10; // 10 min
            const expires = Date.now() + ttl;
            const data = `${phone}.${otp}.${expires}`;

            //const hash = HashService.hashOtp(data);

            const hash = crypto.createHmac('sha256', process.env.OTP_HASH_SECRETE).update(data).digest('hex');
	        const fullHash = `${hash}.${expires}`; 

            console.log(fullHash);
            
            let Data = {
                hash:fullHash,
                otp : otp,
                phone :phone,
            };

            return apiResponse.successResponseWithData(res,"Login Next Action", Data);
    

    } catch (err) {

        console.log(err);
        return apiResponse.ErrorResponse(res, err);
    }
}

exports.verifyOtp = async (req, res,next) => {

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

            console.log(isValid);
            
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
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Db error' });
            }
            
    } catch (err) {

        console.log(err);
        return apiResponse.ErrorResponse(res, "Something went Wrong,Please Try Again.! ");
    }
}





exports.login = async (req, res,next) => {

    try {
            const { email, password,grantType,phone } = req.body;
            const device_info = req.body.device_info ? req.body.device_info : null;

            //const result = await authSchema.validateAsync(req.body);

            if(grantType == 'email'){
                var query = { email : email };

            } else if(grantType == 'phone'){
                var query = { phone : phone };
            }
            
            const user = await UserModel.findOne(query);
            
            //----- If User found then login--------------//
            if (user){

                const isMatch = await user.isPasswordMatch(password);

                if(!isMatch){
                    return apiResponse.unauthorizedResponse(res, "Employee Code or Password are invalid.");
                }

                if(user.status == "active"){

                    let userData = {
                        _id: user._id,
                        user_id: user.user_id,
                        emp_code:user.emp_code,
                        name: user.name,
                        phone: user.phone,
                        email: user.email,
                        role: user.role,
                        status : user.status,
                        profile_image :user.profile_image,
                    };

                    const accessToken = await signAccessToken(user.id);
                    const refreshToken = await signRefreshToken(user.id);

                    userData.accessToken = accessToken;
                    userData.refreshToken = refreshToken;

                    return apiResponse.successResponseWithData(res,"Login Success.", userData);

                } else {
                    return apiResponse.unauthorizedResponse(res, "Account is not confirmed. Please confirm your account.");
                }
                
            } else {
                //----------Register New User------------------//

                let user = new UserModel({
                    user_id:uniqid(),
                    password,name:'',phone,email,
                    login_by:grantType,
                });

                const response = await user.save();

                try{
                    return apiResponse.successResponseWithData(res,"Login successfully.",response);
                } catch(err){
                    return apiResponse.ErrorResponse(res, "Something went Wrong,Please Try Again.! ");
                } 

            }
        

    } catch (err) {

        console.log(err);

        if(err.isJoi === true){ return apiResponse.validationErrorWithData(res, err.details[0].message); }

        return apiResponse.ErrorResponse(res, err);
    }
}

exports.authanticate = async (req, res,next) => {
    try {

            const { email,grantType,phone } = req.body;
            const device_info = req.body.device_info ? req.body.device_info : null;

            //const result = await authSchema.validateAsync(req.body);

            if(grantType == 'email'){
                //var query = { email : result.email };
                var NextAction = 'PASSWORD';
                var tokenKey = email;

            } else if(grantType == 'phone'){
                //var query = { phone : result.phone };
                var NextAction = 'PIN';
                var tokenKey = phone;
            } else {
                return apiResponse.validationErrorWithData(res, "Somthing went Wrong,Please try again."); 
            }

            const accessToken = await loginAccessToken(tokenKey);
            
            let Data = {
                token: accessToken,
                status : "Pending",
                nextAction :NextAction,
            };

            return apiResponse.successResponseWithData(res,"Login Next Action", Data);
    

    } catch (err) {

        console.log(err);

        if(err.isJoi === true){ return apiResponse.validationErrorWithData(res, err.details[0].message); }

        return apiResponse.ErrorResponse(res, err);
    }
}
