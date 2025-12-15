export class EmailAlreadyInUse extends Error {
    constructor() {
        super('The e-mail provide is already in use.')
        this.name = 'EmailAlreadyInUse'
    }
}

export class UserNotFoundError extends Error {
    constructor(userId) {
        super(`The user with ${userId} not found`)
        this.name = 'UserNotFoundError'
    }
}
