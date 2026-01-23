import { faker } from '@faker-js/faker'
import { PasswordHasherAdapter } from '../../adapters'

describe('Password Hasher Adapter', () => {
    it('should return a password hashed', () => {
        const sut = new PasswordHasherAdapter()

        const password = faker.internet.password()

        const result = sut.execute(password)

        expect(result).toBeTruthy()
        expect(result).not.toBe(password)
        expect(typeof result).toBe('string')
    })
})
