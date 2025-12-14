import { badRequest } from './http.js'
import validator from 'validator'

export const sendInvalidPasswordError = () => {
    return badRequest({ message: 'The password must be at least 6 characters' })
}

export const sendInvalidEmailError = () => {
    return badRequest({ message: 'Invalid E-mail. Please provide a valid one' })
}

export const sendInvalidUserIdError = () => {
    return badRequest({ message: 'The provided ID is not valid' })
}

export const verifyEmail = (email) => validator.isEmail(email)

export const verifyPassword = (password) => password.length >= 8

export const verifyUserId = (userId) => validator.isUUID(userId)
