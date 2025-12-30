import { CreateUserController } from '../../../controllers/user/create-user'

describe('Create User Controller', () => {
    class CreateUserUseCaseStub {
        execute(user) {
            return user
        }
    }
    it('should create an user ', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
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

    it('should error 400 if firs_name is undefined or null', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                last_name: 'Defilippo',
                email: 'lucas@defilippo.com',
                password: '123456789',
            },
        }

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })
})
