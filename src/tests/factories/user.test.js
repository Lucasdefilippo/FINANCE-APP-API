import { CreateUserController, UpdateUserController } from '../../controllers'
import {
    makeCreateUserController,
    makeUpdateUserController,
} from '../../factories/controllers/user'

describe('User Controlle Factories', () => {
    it('Should return a valid CreateUserController', () => {
        expect(makeCreateUserController()).toBeInstanceOf(CreateUserController)
    })

    it('should return a valid UpdateUserController', () => {
        expect(makeUpdateUserController()).toBeInstanceOf(UpdateUserController)
    })
})
