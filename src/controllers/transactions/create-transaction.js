import validator from 'validator'
import {
    badRequest,
    created,
    errorServer,
    sendInvalidUserIdError,
    verifyUserId,
} from '../helpers/index.js'

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            const requiredFields = ['user_id', 'name', 'amount', 'date', 'type']

            for (const field of requiredFields) {
                if (
                    !params[field] ||
                    params[field].toString().trim().length === 0
                ) {
                    return badRequest({ Message: `Missing param: ${field}` })
                }
            }

            const userIdValidate = verifyUserId(params.user_id)

            if (!userIdValidate) {
                return sendInvalidUserIdError()
            }

            if (params.amount <= 0) {
                return badRequest({
                    message: 'The amount must be greater than 0',
                })
            }

            const amountIsValid = validator.isCurrency(
                params.amount.toString(),
                {
                    digits_after_decimal: [2],
                    allow_negatives: false,
                    decimal_separator: '.',
                },
            )

            if (!amountIsValid) {
                return badRequest({
                    message: 'The amount must be a valid currency.',
                })
            }

            const type = params.type.trim().toUpperCase()

            const typesValid = ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(
                type,
            )

            if (!typesValid) {
                return badRequest({
                    message: 'The type must be EARNING, EXPENSE, INVESTMENT.',
                })
            }

            const transaction = await this.createTransactionUseCase.execute(
                params,
                type,
            )
            return created(transaction)
        } catch (err) {
            console.error(err)
            return errorServer()
        }
    }
}
