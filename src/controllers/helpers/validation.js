import { badRequest } from './http.js'
import validator from 'validator'

export const verifyUserId = (userId) => validator.isUUID(userId)

export const sendInvalidUserIdError = () => {
    return badRequest({ message: 'The provided ID is not valid' })
}
