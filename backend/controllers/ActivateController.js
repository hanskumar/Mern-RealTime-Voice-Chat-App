const apiResponse   = require("../services/ApiResponse");
const UserModel     = require("../models/UserModel");
const OtpService    = require("../services/otp-service");
const HashService   = require("../services/hash-service");
const crypto        = require('crypto');
const userService   = require("../services/user-service");
const tokenService  = require('../services/jwttoken-service') 

class ActivateController {

    async updateName(req,res){

        const { fullname } = req.body;
        if (!fullname) {
            res.status(400).json({ message: 'Name field is required!' });
        }

        const userId = req.user._id;

        try {

            const user = await userService.findUser({ _id: userId });
            if (!user) {
                res.status(404).json({ message: 'User not found!' });
            }

            user.name = fullname;
            //user.avatar = 'img url';
            user.save();

            let userData = {
                _id: user._id,
                phone: user.phone,
                email: user.email,
                name: user.name,
                status : user.status,
                avatar :user.avatar,
                auth:true
            }
            return apiResponse.successResponseWithData(res,"Account Name Updated Successfully.", userData);

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'message sending failed' });
        }
    }

    async updateAvatar(req,res){

        const { avatar_url } = req.body;
        if (!avatar_url) {
            res.status(400).json({ message: 'avatar field is required!' });
        }

        const userId = req.user._id;

        try{
            const user = await userService.findUser({ _id: userId });

            if (!user) {
                res.status(404).json({ message: 'User not found!' });
            }

            user.isActivated = true;
            user.avatar = avatar_url;
            user.save();

            let userData = {
                _id: user._id,
                phone: user.phone,
                email: user.email,
                name: user.name,
                status : user.status,
                avatar :user.avatar,
                auth:true,
                isActivated:true,
            }
            return apiResponse.successResponseWithData(res,"Account Activated Successfully.", userData);

        } catch(err){
            console.log(err);
            res.status(500).json({ message: 'message sending failed' });
        }
    }

}

module.exports = new ActivateController();