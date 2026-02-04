import jwt from 'jsonwebtoken'

export const auth = (request, response, next) => {
    try {
        //pegar o token
        const accessToken = request.headers?.authorization?.split('Bearer ')[1]

        if (!accessToken) {
            return response.status(401).send({ message: 'Unauthorized' })
        }
        // Verificar Token
        const decodedToken = jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_TOKEN_SECRET,
        )

        if (!decodedToken) {
            return response.status(401).send({ message: 'Unauthorized' })
        }

        request.userId = decodedToken.userId

        // Passar o token
        next()
    } catch (error) {
        console.error(error)
        return response.status(401).send({ message: 'Unauthorized' })
    }
}
