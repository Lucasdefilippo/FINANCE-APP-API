import { badRequest } from './http.js'
import validator from 'validator'

export const checkIdIsValid = (userId) => validator.isUUID(userId)

export const invalidIdResponse = () => {
    return badRequest({ message: 'The provided ID is not valid' })
}
