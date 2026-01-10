import bcrypt from 'bcrypt'

export class PasswordHasherAdapter {
    execute(password) {
        return bcrypt.hashSync(password, 10)
    }
}
