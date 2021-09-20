const jwt = require('jsonwebtoken');
const refreshTokenModel = require('../models/TokenModel');

class TokenService {

    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
            //expiresIn: process.env.JWT_ACCESS_TOKEN_TIMEOUT_DURATION,
            expiresIn: '1m',
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
            expiresIn: process.env.JWT_REFRESH_TOKEN_TIMEOUT_DURATION,
        });
        return { accessToken, refreshToken };
    }

    async verifyAccessToken(token) {
        return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    }

    async verifyRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
    }

    async storeRefreshToken(token, userId) {
        try {
            await refreshTokenModel.create({
                token,
                userId,
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    async findRefreshToken(UserId,refreshToken) {
       return await refreshTokenModel.findOne({
            userId: UserId,
            token: refreshToken,
        });
    }

    async updateRefreshToken(UserId,refreshToken){

        return await refreshTokenModel.updateOne(
            {userId:UserId},
            {token:refreshToken}
        );
    }
}

module.exports = new TokenService()