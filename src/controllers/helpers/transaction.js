import validator from 'validator'

export const checkIfIsValidCurrency = (amount) => {
    return validator.isCurrency(amount.toString(), {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: '.',
    })
}

export const checkIfIsValidType = (type) => {
    return ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(type)
}

export const amountIsNotValid = () => {
    return badRequest({
        message: 'The amount must be a valid currency.',
    })
}

export const typeIsNotValid = () => {
    return badRequest({
        message: 'The type must be EARNING, EXPENSE, INVESTMENT.',
    })
}
