import jwt from 'jsonwebtoken'

export class TokensGeneratorAdapter {
    execute(user_id) {
        return {
            accessToken: jwt.sign(
                { userId: user_id },
                process.env.JWT_ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' },
            ),
            refreshToken: jwt.sign(
                { userId: user_id },
                process.env.JWT_REFRESH_TOKEN_SECRET,
                { expiresIn: '30d' },
            ),
        }
    }
}
