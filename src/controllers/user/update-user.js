import { EmailAlreadyInUse } from '../../errors/user.js'
import {
    sendInvalidEmailError,
    sendInvalidPasswordError,
    sendInvalidUserIdError,
    verifyEmail,
    verifyPassword,
    verifyUserId,
    badRequest,
    errorServer,
    Ok,
} from '../helpers/index.js'

export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            // Verificar o ID

            const userId = httpRequest.params.userId

            const isValidId = verifyUserId(userId)

            if (!isValidId) {
                return sendInvalidUserIdError()
            }

            // Verificar campos.

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]
            for (const param of allowedFields) {
                if (!param) {
                    if (params[param].trim().length === 0) {
                        return badRequest({
                            Message: `Missing param: ${param}`,
                        })
                    }
                }
            }

            const someFieldsIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldsIsNotAllowed) {
                return badRequest({
                    message: 'Some provide field is invalid.',
                })
            }

            // Vericiar e-mail

            if (params.password) {
                const passwordIsNotValid = verifyPassword(params.password)

                if (!passwordIsNotValid) {
                    return sendInvalidPasswordError()
                }
            }

            if (params.email) {
                const emailIsValid = verifyEmail(params.email)

                if (!emailIsValid) {
                    return sendInvalidEmailError()
                }
            }

            const user = await this.updateUserUseCase.execute(userId, params)

            return Ok({
                user,
            })
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
