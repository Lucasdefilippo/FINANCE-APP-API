import { badRequest, errorServer, Ok } from './helpers/http.js'
import { EmailAlreadyInUse } from '../errors/user.js'
import { UpdateUserUseCase } from '../use-cases/uptade-user.js'
import {
    sendInvalidEmailError,
    sendInvalidPasswordError,
    sendInvalidUserIdError,
    verifyEmail,
    verifyPassword,
    verifyUserId,
} from './helpers/user.js'

export class UpdateUserController {
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
                console.log(params[param])
                if (params[param].trim().length === 0) {
                    return badRequest({
                        Message: `Missing param: ${param}`,
                    })
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

            const updateUserUseCase = new UpdateUserUseCase()

            const user = await updateUserUseCase.execute(userId, params)

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
