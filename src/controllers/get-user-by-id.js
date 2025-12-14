import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { errorServer, notFound, Ok } from './helpers/http.js'
import { sendInvalidUserIdError, verifyUserId } from './helpers/user.js'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isValidId = verifyUserId(httpRequest.params.userId)

            if (!isValidId) {
                return sendInvalidUserIdError()
            }

            const getUserByIdUseCase = new GetUserByIdUseCase()

            const user = await getUserByIdUseCase.execute(
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
