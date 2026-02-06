import { ZodError } from 'zod'
import { UnauthorizedError } from '../../errors/user'
import { refreshTokenSchema } from '../../schemas/index.js'
import { badRequest, errorServer, Ok, unauthorized } from '../helpers/index.js'

export class RefreshTokenController {
    constructor(refreshTokenUseCase) {
        this.refreshTokenUseCase = refreshTokenUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            await refreshTokenSchema.parseAsync(params)

            const result = this.refreshTokenUseCase.execute(params.refreshToken)

            return Ok(result)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.issues[0].message,
                })
            }

            if (error instanceof UnauthorizedError) {
                return unauthorized('Unauthorized')
            }

            return errorServer()
        }
    }
}
