import { badRequest } from './http.js'
import validator from 'validator'

export const checkIdIsValid = (userId) => validator.isUUID(userId)

export const invalidIdResponse = () => {
    return badRequest({ message: 'The provided ID is not valid' })
}

export const checkIfIsString = (value) => typeof value === 'string'

export const checkFields = (params, requiredFields) => {
    for (const field of requiredFields) {
        const fieldMissing = !params[field]
        const fieldEmpty =
            checkIfIsString(params[field]) &&
            validator.isEmpty(params[field], { ignore_whitespace: true })

        if (fieldMissing || fieldEmpty) {
            return {
                missingField: field,
                response: false,
            }
        }
    }
    return {
        response: true,
        missingField: undefined,
    }
}
