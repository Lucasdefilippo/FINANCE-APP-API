import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { badRequest, errorServer } from './helper.js'
import { validate } from 'uuid'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isValidId = validate(httpRequest.params.userId)

            if (!isValidId) {
                return badRequest({ message: 'The provided ID is not valid' })
            }

            const getUserByIdUseCase = new GetUserByIdUseCase()

            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            )

            return {
                statusCode: 200,
                body: user,
            }
        } catch (error) {
            console.error(error)
            return errorServer()
        }
    }
}
