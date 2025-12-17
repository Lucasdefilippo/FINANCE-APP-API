import { EmailAlreadyInUse } from '../../errors/user.js'
import {
    sendInvalidEmailError,
    sendInvalidPasswordError,
    verifyEmail,
    verifyPassword,
    badRequest,
    created,
    errorServer,
} from '../helpers/index.js'

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({ Message: `Missing param: ${field}` })
                }
            }

            const passwordIsNotValid = verifyPassword(params.password)

            if (!passwordIsNotValid) {
                return sendInvalidPasswordError()
            }

            const emailIsValid = verifyEmail(params.email)

            if (!emailIsValid) {
                return sendInvalidEmailError()
            }

            const createdUser = await this.createUserUseCase.execute(params)

            return created({ body: createdUser })
        } catch (error) {
            if (error instanceof EmailAlreadyInUse) {
                return badRequest({
                    message: error.message,
                })
            }
            console.error(error)
            return errorServer()
        }
    }
}
