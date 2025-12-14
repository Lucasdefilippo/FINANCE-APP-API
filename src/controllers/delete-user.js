import { DeleteUserUseCase } from '../use-cases/delete-user.js'
import {
    errorServer,
    notFound,
    Ok,
    sendInvalidUserIdError,
    verifyUserId,
} from './helpers/index.js'

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const isValidId = verifyUserId(userId)

            if (!isValidId) {
                return sendInvalidUserIdError()
            }

            const deleteUserUseCase = new DeleteUserUseCase()

            const user = await deleteUserUseCase.execute(userId)

            if (!user) {
                return notFound({
                    message: 'User Not found.',
                })
            }

            return Ok({ user })
        } catch (error) {
            console.error(error)
            return errorServer()
        }
    }
}
