import {
    errorServer,
    notFound,
    Ok,
    sendInvalidUserIdError,
    verifyUserId,
} from './helpers/index.js'

export class DeleteUserController {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const isValidId = verifyUserId(userId)

            if (!isValidId) {
                return sendInvalidUserIdError()
            }

            const user = await this.deleteUserUseCase.execute(userId)

            if (!user) {
                return notFound({
                    message: 'User Not found.',
                })
            }

            return Ok({ Successfully_deleted: user })
        } catch (error) {
            console.error(error)
            return errorServer()
        }
    }
}
