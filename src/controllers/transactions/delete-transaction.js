import {
    errorServer,
    notFound,
    Ok,
    invalidIdResponse,
    checkIdIsValid,
} from '../helpers/index.js'

export class DeleteTransactionController {
    constructor(deleteTransactionUseCase) {
        this.deleteTransactionUseCase = deleteTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            const transactionId = httpRequest.params.transactionId

            const isValidId = checkIdIsValid(transactionId)

            if (!isValidId) {
                return invalidIdResponse()
            }

            const transaction =
                await this.deleteTransactionUseCase.execute(transactionId)

            if (!transaction) {
                return notFound({
                    message: 'Transaction Not found.',
                })
            }

            return Ok({ Successfully_deleted: transaction })
        } catch (error) {
            console.error(error)
            return errorServer()
        }
    }
}
