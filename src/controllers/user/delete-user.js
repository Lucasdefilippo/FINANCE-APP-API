import { UserNotFoundError } from '../../errors/user.js'
import {
    errorServer,
    notFound,
    Ok,
    invalidIdResponse,
    checkIdIsValid,
} from '../helpers/index.js'

export class DeleteUserController {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const isValidId = checkIdIsValid(userId)

            if (!isValidId) {
                return invalidIdResponse()
            }

            const user = await this.deleteUserUseCase.execute(userId)

            return Ok({ Successfully_deleted: user })
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return notFound({
                    message: 'User Not found.',
                })
            }
            console.error(error)
            return errorServer()
        }
    }
}
