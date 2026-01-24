import {
    invalidIdResponse,
    checkIdIsValid,
    errorServer,
    notFound,
    Ok,
} from '../helpers/index.js'

export class GetUserByIdController {
    constructor(getUserByIdUseCase) {
        this.getUserByIdUseCase = getUserByIdUseCase
    }

    async execute(httpRequest) {
        try {
            const isValidId = checkIdIsValid(httpRequest.params.userId)

            if (!isValidId) {
                return invalidIdResponse()
            }

            const user = await this.getUserByIdUseCase.execute(
                httpRequest.params.userId,
            )

            if (!user) {
                return notFound({
                    message: 'User Not found.',
                })
            }

            return Ok(user)
        } catch (error) {
            console.error(error)
            return errorServer()
        }
    }
}
