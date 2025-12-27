import { badRequest } from './http.js'

export const sendInvalidPasswordError = () => {
    return badRequest({ message: 'The password must be at least 6 characters' })
}

export const sendInvalidEmailError = () => {
    return badRequest({ message: 'Invalid E-mail. Please provide a valid one' })
}
