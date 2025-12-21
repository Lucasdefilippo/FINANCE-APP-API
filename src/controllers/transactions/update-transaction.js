import {
    checkIdIsValid,
    checkIfIsValidType,
    errorServer,
    invalidIdResponse,
    Ok,
    typeIsNotValid,
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

            const allowedFields = ['name', 'date', 'amount', 'type']

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

            if (params.amount) {
                const amountIsValid = checkIfIsValidCurrency(params.amount)

                if (!amountIsValid) {
                    return amountIsNotValid()
                }
            }

            if (params.type) {
                const typeIsValid = checkIfIsValidType(params.type)

                if (!typeIsValid) {
                    return typeIsNotValid()
                }
            }

            const result = this.updateTransactionUseCase.execute(
                httpRequest.params.transactionId,
                params,
            )

            return Ok(result)
        } catch (error) {
            console.error(error)

            return errorServer()
        }
    }
}
