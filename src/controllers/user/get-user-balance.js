import { ZodError } from 'zod'
import { UserNotFoundError } from '../../errors/user.js'
import { getUserBalanceSchema } from '../../schemas/user.js'
import { errorServer, Ok, notFound, badRequest } from '../helpers/index.js'

export class GetUserBalanceController {
    constructor(getUserBalanceUseCase) {
        this.getUserBalanceUseCase = getUserBalanceUseCase
    }

    async execute(httpRequest) {
        try {
            const user = httpRequest.params.userId
            const from = httpRequest.query.from
            const to = httpRequest.query.to

            await getUserBalanceSchema.parseAsync({ user_id: user, from, to })

            const result = await this.getUserBalanceUseCase.execute(
                user,
                from,
                to,
            )

            return Ok(result)
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return notFound({ message: 'User not found' })
            }

            if (error instanceof ZodError) {
                return badRequest({
                    message: 'Field provided is not valid',
                })
            }

            console.error(error)

            return errorServer()
        }
    }
}
