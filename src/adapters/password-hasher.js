import bcrypt from 'bcrypt'

export class PasswordHasherAdapter {
    async execute(password) {
        return bcrypt.hashSync(password, 10)
    }
}
