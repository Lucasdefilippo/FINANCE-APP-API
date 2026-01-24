import { ZodError } from 'zod'
import { EmailAlreadyInUse, UserNotFoundError } from '../../errors/user.js'
import { updateUserSchema } from '../../schemas/index.js'
import {
    invalidIdResponse,
    checkIdIsValid,
    badRequest,
    errorServer,
    Ok,
    notFound,
} from '../helpers/index.js'

export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            const userId = httpRequest.params.userId

            const isValidId = checkIdIsValid(userId)

            if (!isValidId) {
                return invalidIdResponse()
            }
            await updateUserSchema.parseAsync(params)

            const user = await this.updateUserUseCase.execute(userId, params)

            return Ok(user)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.issues[0].message,
                })
            }

            if (error instanceof EmailAlreadyInUse) {
                return badRequest({
                    message: error.message,
                })
            }

            if (error instanceof UserNotFoundError) {
                return notFound({ message: 'User not found' })
            }
            console.error(error)
            return errorServer()
        }
    }
}
