import { UserNotFoundError } from '../../errors/user.js'
import {
    checkIdIsValid,
    invalidIdResponse,
    badRequest,
    errorServer,
    Ok,
} from '../helpers/index.js'

export class GetUserBalanceController {
    constructor(getUserBalanceUseCase) {
        this.getUserBalanceUseCase = getUserBalanceUseCase
    }

    async execute(httpRequest) {
        try {
            const user = httpRequest.params.userId

            const isValid = checkIdIsValid(user)

            if (!isValid) {
                return invalidIdResponse()
            }

            const result = await this.getUserBalanceUseCase.execute({
                userId: user,
            })

            return Ok({ result })
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return badRequest({ message: 'User not found' })
            }

            console.error(error)

            return errorServer()
        }
    }
}
