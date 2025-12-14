import { errorServer, notFound, Ok } from './helpers/http.js'
import { sendInvalidUserIdError, verifyUserId } from './helpers/user.js'

export class GetUserByIdController {
    constructor(getUserByIdUseCase) {
        this.getUserByIdUseCase = getUserByIdUseCase
    }

    async execute(httpRequest) {
        try {
            const isValidId = verifyUserId(httpRequest.params.userId)

            if (!isValidId) {
                return sendInvalidUserIdError()
            }

            const user = await this.getUserByIdUseCase.execute(
                httpRequest.params.userId,
            )

            if (!user) {
                return notFound({
                    message: 'User Not found.',
                })
            }

            return Ok({
                user,
            })
        } catch (error) {
            console.error(error)
            return errorServer()
        }
    }
}
