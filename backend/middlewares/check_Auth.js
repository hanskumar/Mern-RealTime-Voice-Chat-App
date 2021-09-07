/*
 * Middleware to check  auth token
*/
const JWT           = require('jsonwebtoken');
const apiResponse   = require("../services/ApiResponse");
const tokenService  = require("../services/jwttoken-service");


module.exports = async function (req, res, next) {

        const authHeader = req.headers['authorization'] || req.headers['x-access-token'];
        if(authHeader){

            var token  = req.headers.authorization.split("Bearer ")[1] || undefined;

            if(!token){
                throw new Error();
            }

            const userData = await tokenService.verifyAccessToken(token);

            if (!userData) {
                throw new Error();
            }
            req.user = userData;
            next();

        } else {
            return apiResponse.unauthorizedResponse(res, "Unautharized Error");
        }
}
