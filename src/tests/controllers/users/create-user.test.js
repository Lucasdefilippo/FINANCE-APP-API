import { CreateUserController } from '../../../controllers/user/create-user'

describe('Create User Controller', () => {
    class CreateUserUseCaseStub {
        execute(user) {
            return user
        }
    }

    // Test for create a user

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

    // Test for status code 400 if firs_name is undefined or null

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

    // Test for status code 400 if last_name is undefined or null

    it('should error 400 if last_name is undefined or null', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'Lucas',
                email: 'lucas@defilippo.com',
                password: '123456789',
            },
        }

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })

    // Test for status code 400 if email is undefined or null

    it('should error 400 if e-mail is undefined or null', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'Lucas',
                last_name: 'Defilippo',
                password: '123456789',
            },
        }

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })

    // Test for status code 400 if email is not valid

    it('should error 400 if e-mail is not valid', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'Lucas',
                last_name: 'Defilippo',
                email: 'lucasdefilippo',
                password: '123456789',
            },
        }

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })

    // Test for status code 400 if password is undefined or null

    it('should error 400 if password is undefinded or null', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'Lucas',
                last_name: 'Defilippo',
                email: 'lucas@defilippo.com',
            },
        }

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })

    // Test for status code 400 if password is less than 6 characters

    it('should error 400 if password is less than 6 characters', async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'Lucas',
                last_name: 'Defilippo',
                email: 'lucas@defilippo.com',
                password: '12345',
            },
        }

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })
})
