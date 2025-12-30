import { CreateUserController } from '../../../controllers/user/create-user'

describe('Create User Controller', () => {
    class CreateUserUseCase {
        execute(user) {
            return user
        }
    }
    it('should create an user ', async () => {
        const createUserUseCase = new CreateUserUseCase()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'Lucas',
                last_name: 'Defilippo',
                email: 'lucas@defilippo.com',
                password: '123456789',
            },
        }

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(201)
        expect(result.body).not.toBeNull()
        expect(result.body).not.toBeUndefined()
    })
})
