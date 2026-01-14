import { faker } from '@faker-js/faker'
import { UpdateUserUseCase } from '../../../use-cases'

describe('Update User Use Case', () => {
    const user = {
        ID: faker.string.uuid(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 7 }),
    }

    class GetUserByEmailRepositoryStub {
        async execute() {
            return null
        }
    }

    class PasswordHasherAdapterStub {
        execute() {
            return 'hashed_password'
        }
    }

    class UpdateUserRepositoryStub {
        async execute() {
            return user
        }
    }
    const makeSut = () => {
        const getUserByEmailRepository = new GetUserByEmailRepositoryStub()
        const passwordHasher = new PasswordHasherAdapterStub()
        const updateUserRepository = new UpdateUserRepositoryStub()

        const sut = new UpdateUserUseCase(
            updateUserRepository,
            getUserByEmailRepository,
            passwordHasher,
        )

        return {
            sut,
            getUserByEmailRepository,
            passwordHasher,
            updateUserRepository,
        }
    }

    it('should update user successfully (without email and password)', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(faker.string.uuid(), {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
        })

        expect(result).toBe(user)
    })

    it('should update user successfully (with email)', async () => {
        const { sut, getUserByEmailRepository } = makeSut()
        const spy = jest.spyOn(getUserByEmailRepository, 'execute')

        const email = faker.internet.email()

        const result = await sut.execute(faker.string.uuid(), {
            email: email,
        })

        expect(spy).toHaveBeenCalledWith(email)
        expect(result).toBe(user)
    })
})
