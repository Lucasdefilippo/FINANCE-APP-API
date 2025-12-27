import { ZodError } from 'zod'
import { createTransactionsSchema } from '../../schemas/transactions.js'
import { badRequest, created, errorServer } from '../helpers/index.js'

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            await createTransactionsSchema.parseAsync(params)

            const transaction =
                await this.createTransactionUseCase.execute(params)

            return created(transaction)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.issues[0].message,
                })
            }

            console.error(err)
            return errorServer()
        }
    }
}
