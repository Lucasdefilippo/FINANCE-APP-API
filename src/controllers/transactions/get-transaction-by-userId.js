import { UserNotFoundError } from '../../errors/user.js'
import {
    notFound,
    Ok,
    sendInvalidUserIdError,
    verifyUserId,
} from '../helpers/index.js'

export class GetTransactionsByUserIdController {
    constructor(getTransactionsByUserIdUseCase) {
        this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId

            if (!userId) {
                return sendInvalidUserIdError()
            }

            const checkUserId = verifyUserId(userId)

            if (!checkUserId) {
                return { statusCode: 400, body: 'Foi não chefia' }
            }

            const result =
                await this.getTransactionsByUserIdUseCase.execute(userId)

            return Ok({ result })
        } catch (error) {
            console.error(error)
            if (error instanceof UserNotFoundError) {
                return notFound({
                    message: 'User is Not Found',
                })
            }
        }
    }
}
