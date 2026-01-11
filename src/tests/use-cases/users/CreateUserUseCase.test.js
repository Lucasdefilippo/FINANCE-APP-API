import { faker } from '@faker-js/faker'
import { CreateUserUseCase } from '../../../../src/use-cases/user/create-user.js'

describe('Create User Use Case', () => {
    class CreateUserRepositoryStub {
        async execute(params) {
            return params
        }
    }

    class GetUserByEmailRepositoryStub {
        async execute() {
            return null
        }
    }

    class PasswordHasherAdapterStub {
        execute() {
            return 'Password_hashed'
        }
    }

    class IdGeneratorAdapterStub {
        execute() {
            return 'Generated_id'
        }
    }

    const makeSut = () => {
        const createUserRepository = new CreateUserRepositoryStub()
        const getUserByEmailRepository = new GetUserByEmailRepositoryStub()
        const passwordHasherAdapter = new PasswordHasherAdapterStub()
        const idGeneratorAdapter = new IdGeneratorAdapterStub()
        const sut = new CreateUserUseCase(
            createUserRepository,
            getUserByEmailRepository,
            passwordHasherAdapter,
            idGeneratorAdapter,
        )

        return {
            sut,
            createUserRepository,
            getUserByEmailRepository,
            passwordHasherAdapter,
            idGeneratorAdapter,
        }
    }

    const httpRequest = {
        body: {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 7 }),
        },
    }

    it('should successfuly created user', async () => {
        const { sut, idGeneratorAdapter, passwordHasherAdapter } = makeSut()
        const user_id = idGeneratorAdapter.execute()

        const passwordHasher = passwordHasherAdapter.execute(
            httpRequest.body.password,
        )

        const user = {
            ...httpRequest,
            ID: user_id,
            password: passwordHasher,
        }

        const result = await sut.execute(user)

        expect(result).toEqual(user)
    })

    it('should that ID is generated with successfully', async () => {
        const { sut, idGeneratorAdapter } = makeSut()
        const user_id = idGeneratorAdapter.execute()

        const result = await sut.execute({
            body: { ...httpRequest.body, ID: user_id },
        })

        expect(result.body.ID).toBe(user_id)
    })
})
