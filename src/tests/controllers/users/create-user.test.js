import { CreateUserController } from '../../../controllers/user/create-user'
import { faker } from '@faker-js/faker'
import { EmailAlreadyInUse } from '../../../errors/user'

describe('Create User Controller', () => {
    class CreateUserUseCaseStub {
        execute(user) {
            return user
        }
    }

    const makeSut = () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        return { createUserController, createUserUseCase }
    }

    // Test for create a user

    it('should create an user ', async () => {
        const { createUserController } = makeSut()

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 7 }),
            },
        }

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(201)
        expect(result.body).toEqual(httpRequest)
    })

    // Test for status code 400 if firs_name is undefined or null

    it('should error 400 if firs_name is undefined or null', async () => {
        const { createUserController } = makeSut()

        const httpRequest = {
            body: {
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 7 }),
            },
        }

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })

    // Test for status code 400 if last_name is undefined or null

    it('should error 400 if last_name is undefined or null', async () => {
        const { createUserController } = makeSut()

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 7 }),
            },
        }

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })

    // Test for status code 400 if email is undefined or null

    it('should error 400 if e-mail is undefined or null', async () => {
        const { createUserController } = makeSut()

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                password: faker.internet.password({ length: 7 }),
            },
        }

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })

    // Test for status code 400 if email is not valid

    it('should error 400 if e-mail is not valid', async () => {
        const { createUserController } = makeSut()

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: 'invalid_email',
                password: faker.internet.password({ length: 7 }),
            },
        }

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })

    // Test for status code 400 if password is undefined or null

    it('should error 400 if password is undefinded or null', async () => {
        const { createUserController } = makeSut()

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
            },
        }

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })

    // Test for status code 400 if password is less than 6 characters

    it('should error 400 if password is less than 6 characters', async () => {
        const { createUserController } = makeSut()

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 5 }),
            },
        }

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })

    //

    it('', async () => {
        const { createUserController, createUserUseCase } = makeSut()

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 7 }),
            },
        }

        const executeSpy = jest.spyOn(createUserUseCase, 'execute')

        await createUserController.execute(httpRequest)

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body)
    })

    //

    it('should return 500 if CreateUserUseCase throws', async () => {
        const { createUserController, createUserUseCase } = makeSut()

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 7 }),
            },
        }

        jest.spyOn(createUserUseCase, 'execute').mockImplementationOnce(() => {
            throw new Error()
        })

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(500)
    })

    //

    it('sould return 400 if CreateUserUseCase throw EmailAlreadyInUse', async () => {
        const { createUserController, createUserUseCase } = makeSut()

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 7 }),
            },
        }

        jest.spyOn(createUserUseCase, 'execute').mockImplementationOnce(() => {
            throw new EmailAlreadyInUse(httpRequest.body.email)
        })

        const result = await createUserController.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })
})
