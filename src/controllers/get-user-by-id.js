import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { badRequest, errorServer, notFound, Ok } from './helper.js'
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
