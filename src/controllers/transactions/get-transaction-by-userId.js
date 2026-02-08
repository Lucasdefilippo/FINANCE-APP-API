import { ZodError } from 'zod'
import { UserNotFoundError } from '../../errors/user.js'
import { getTransactionsByUserIdSchema } from '../../schemas/transactions.js'
import { notFound, Ok, errorServer, badRequest } from '../helpers/index.js'

export class GetTransactionsByUserIdController {
    constructor(getTransactionsByUserIdUseCase) {
        this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId
            const from = httpRequest.query.from
            const to = httpRequest.query.to

            console.log(httpRequest.query)

            await getTransactionsByUserIdSchema.parseAsync({
                user_id: userId,
                from,
                to,
            })

            const result =
                await this.getTransactionsByUserIdUseCase.execute(userId)

            return Ok(result)
        } catch (error) {
            console.error(error)
            if (error instanceof UserNotFoundError) {
                return notFound({
                    message: 'User is Not Found',
                })
            }
            if (error instanceof ZodError) {
                return badRequest({
                    message: 'Parameters issue',
                })
            }
            return errorServer()
        }
    }
}
