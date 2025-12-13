import { badRequest, errorServer, Ok } from './helper.js'
import validator from 'validator'
import { EmailAlreadyInUse } from '../errors/user.js'
import { UpdateUserUseCase } from '../use-cases/uptade-user.js'

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const updateUserParams = httpRequest.body

            // Verificar o ID

            const userId = httpRequest.params.userId

            const isValidId = validator.isUUID(userId)

            if (!isValidId) {
                return badRequest({ message: 'The provided ID is not valid' })
            }

            // Verificar campos.

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const someFieldsIsNotAllowed = Object.keys(updateUserParams).some(
                (field) => {
                    !allowedFields.includes(field)
                },
            )

            if (someFieldsIsNotAllowed) {
                return badRequest({
                    message: 'Some provide field is invalid.',
                })
            }

            // Vericiar e-mail

            if (updateUserParams.password) {
                const passwordIsNotValid = updateUserParams.password.length >= 8

                if (!passwordIsNotValid) {
                    return badRequest({
                        message: 'The password must be at least 6 characters',
                    })
                }
            }

            if (updateUserParams.email) {
                const emailIsValid = validator.isEmail(updateUserParams.email)

                if (!emailIsValid) {
                    return badRequest({
                        message: 'Invalid E-mail. Please provide a valid one',
                    })
                }
            }

            const updateUserUseCase = new UpdateUserUseCase()

            const user = await updateUserUseCase.execute(
                userId,
                updateUserParams,
            )

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
