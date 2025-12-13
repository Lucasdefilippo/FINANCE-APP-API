import { CreateUserUseCase } from '../use-cases/create-user.js'
import validator from 'validator'
import { badRequest, created, errorServer } from './helper.js'
import { EmailAlreadyInUse } from '../errors/user.js'

export class CreateUserController {
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

            const passwordIsNotValid = params.password.length >= 8

            if (!passwordIsNotValid) {
                return badRequest({
                    message: 'The password must be at least 6 characters',
                })
            }

            const emailIsValid = validator.isEmail(params.email)

            if (!emailIsValid) {
                return badRequest({
                    message: 'Invalid E-mail. Please provide a valid one',
                })
            }

            const useCase = new CreateUserUseCase()

            const createdUser = await useCase.execute(params)

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
