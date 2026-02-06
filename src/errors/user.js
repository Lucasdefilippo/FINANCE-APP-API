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

export class InvalidPasswordError extends Error {
    constructor() {
        super('The credential is not valid')
        this.name = 'InvalidPasswordError'
    }
}

export class ForbiddenError extends Error {
    constructor() {
        super('Forbidden.')
        this.name = 'ForbiddenError'
    }
}

export class UnauthorizedError extends Error {
    constructor() {
        super('Unauthorized')
        this.name = 'UnauthorizedError'
    }
}
