import { CreateUserController } from '../../controllers'
import { makeCreateUserController } from '../../factories/controllers/user'

describe('User Controlle Factories', () => {
    it('Should return a valid CreateUserController', () => {
        expect(makeCreateUserController()).toBeInstanceOf(CreateUserController)
    })
})
