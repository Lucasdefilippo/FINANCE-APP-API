import { badRequest } from './http.js'
import validator from 'validator'

export const sendInvalidPasswordError = () => {
    return badRequest({ message: 'The password must be at least 6 characters' })
}

export const sendInvalidEmailError = () => {
    return badRequest({ message: 'Invalid E-mail. Please provide a valid one' })
}

export const verifyEmail = (email) => validator.isEmail(email)

export const verifyPassword = (password) => password.length >= 8
