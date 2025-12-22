import {
    amountIsNotValid,
    badRequest,
    checkFields,
    checkIfIsValidCurrency,
    checkIfIsValidType,
    created,
    errorServer,
    invalidIdResponse,
    checkIdIsValid,
    typeIsNotValid,
} from '../helpers/index.js'

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            const requiredFields = ['user_id', 'name', 'amount', 'date', 'type']

            const { response, missingField } = checkFields(
                params,
                requiredFields,
            )

            if (!response) {
                return badRequest({
                    message: `The field ${missingField} is required`,
                })
            }

            const userIdValidate = checkIdIsValid(params.user_id)

            if (!userIdValidate) {
                return invalidIdResponse()
            }

            const amountIsValid = checkIfIsValidCurrency(params.amount)

            if (!amountIsValid) {
                return amountIsNotValid()
            }

            const type = params.type.trim().toUpperCase()

            const typesValid = checkIfIsValidType(type)

            if (!typesValid) {
                return typeIsNotValid()
            }

            const transaction = await this.createTransactionUseCase.execute(
                ...[params],
                type,
            )

            return created(transaction)
        } catch (err) {
            console.error(err)
            return errorServer()
        }
    }
}
