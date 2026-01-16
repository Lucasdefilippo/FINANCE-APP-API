import { faker } from '@faker-js/faker'
import { UpdateUserUseCase } from '../../../use-cases'
import { EmailAlreadyInUse } from '../../../errors/user'
import { user } from '../../index.js'

describe('Update User Use Case', () => {
    class GetUserByEmailRepositoryStub {
        async execute() {
            return null
        }
    }

    class PasswordHasherAdapterStub {
        async execute() {
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

    it('should update user successfully (with password)', async () => {
        const { sut, passwordHasher } = makeSut()
        const spy = jest.spyOn(passwordHasher, 'execute')

        const password = faker.internet.password()

        const result = await sut.execute(faker.string.uuid(), {
            password: password,
        })

        expect(spy).toHaveBeenCalledWith(password)
        expect(result).toBe(user)
    })

    it('should throw EmailAlreadyInUseError if email already in use', async () => {
        const { sut, getUserByEmailRepository } = makeSut()
        jest.spyOn(getUserByEmailRepository, 'execute').mockResolvedValue(user)

        const promise = sut.execute(faker.string.uuid(), {
            email: faker.internet.email(),
        })

        await expect(promise).rejects.toThrow(new EmailAlreadyInUse(user.email))
    })

    it('should call UpdateUserRepository with correct pareams', async () => {
        const { sut, updateUserRepository } = makeSut()
        const spy = jest.spyOn(updateUserRepository, 'execute')
        const updateUserParams = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
        }

        await sut.execute(user.ID, updateUserParams)

        expect(spy).toHaveBeenCalledWith(user.ID, {
            ...updateUserParams,
            password: 'hashed_password',
        })
    })

    it('should throw if GetUserByEmailRepository throws', async () => {
        const { sut, getUserByEmailRepository } = makeSut()
        jest.spyOn(getUserByEmailRepository, 'execute').mockRejectedValue(
            new Error(),
        )

        const promise = sut.execute(user.ID, {
            email: faker.internet.email(),
        })

        await expect(promise).rejects.toThrow()
    })

    it('should throw if passwordHasherAdapter throws', async () => {
        const { sut, passwordHasher } = makeSut()
        jest.spyOn(passwordHasher, 'execute').mockRejectedValue(new Error())

        const promise = sut.execute(faker.string.uuid(), {
            password: faker.internet.password(),
        })

        await expect(promise).rejects.toThrow()
    })
})
