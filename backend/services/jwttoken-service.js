const jwt = require('jsonwebtoken');

class TokenService {

    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
            expiresIn: '1m',
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
            expiresIn: '1y',
        });
        return { accessToken, refreshToken };
    }

}

module.exports = new TokenService()