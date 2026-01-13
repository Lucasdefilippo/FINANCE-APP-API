import { ZodError } from 'zod'
import { updateTransactionSchema } from '../../schemas/index.js'
import {
    badRequest,
    checkIdIsValid,
    errorServer,
    invalidIdResponse,
    Ok,
} from '../helpers/index.js'

export class UpdateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase
    }

    async execute(httpRequest) {
        try {
            const idIsValid = checkIdIsValid(httpRequest.params.transactionId)

            if (!idIsValid) {
                return invalidIdResponse()
            }
            const params = httpRequest.body

            if (params.transactionId || params.ID) {
                return badRequest({
                    message: 'It is not possible to change the transaction ID.',
                })
            }

            await updateTransactionSchema.parseAsync(params)

            const result = await this.updateTransactionUseCase.execute(
                httpRequest.params.transactionId,
                params,
            )

            return Ok(result)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.issues[0].message,
                })
            }
            console.error(error)

            return errorServer()
        }
    }
}
