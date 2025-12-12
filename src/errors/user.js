export class EmailAlreadyInUse extends Error {
    constructor() {
        super('The e-mail provide is already in use.')
        this.name = 'EmailAlreadyInUse'
    }
}
