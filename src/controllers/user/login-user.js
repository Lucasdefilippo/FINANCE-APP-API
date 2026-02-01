import { ZodError } from 'zod'
import { loginSchema } from '../../schemas/user'
import {
    badRequest,
    errorServer,
    notFound,
    Ok,
    unauthorized,
} from '../helpers/index.js'
import { InvalidPasswordError, UserNotFoundError } from '../../errors/user.js'

export class LoginUserController {
    constructor(LoginUserUseCase) {
        this.LoginUserUseCase = LoginUserUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            await loginSchema.parseAsync(params)

            const user = await this.LoginUserUseCase.execute(
                params.email,
                params.password,
            )

            return Ok(user)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.issues[0].message,
                })
            }

            if (error instanceof InvalidPasswordError) {
                return unauthorized('unauthorized')
            }

            if (error instanceof UserNotFoundError) {
                return notFound({ message: 'User not found' })
            }

            return errorServer(error)
        }
    }
}
