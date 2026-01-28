import { CreateUserUseCase } from '../../../use-cases/index.js'
import { EmailAlreadyInUse } from '../../../errors/user.js'
import { user } from '../../fixtures/user.js'

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

    it('should successfuly created user', async () => {
        const { sut, idGeneratorAdapter, passwordHasherAdapter } = makeSut()
        const user_id = idGeneratorAdapter.execute()

        const passwordHasher = passwordHasherAdapter.execute(user.password)

        const userParams = {
            ...user,
            id: user_id,
            password: passwordHasher,
        }

        const result = await sut.execute(userParams)

        expect(result).toEqual(userParams)
    })

    it('should that ID is generated with successfully', async () => {
        const { sut, idGeneratorAdapter } = makeSut()
        const user_id = idGeneratorAdapter.execute()

        const result = await sut.execute({
            body: { ...user, id: user_id },
        })

        expect(result.id).toBe(user_id)
    })

    it('should the password has hashed successfully', async () => {
        const { sut, passwordHasherAdapter } = makeSut()
        const password_hashed = passwordHasherAdapter.execute(user.password)

        const result = await sut.execute({
            body: { ...user, password: password_hashed },
        })

        expect(result.password).toBe(password_hashed)
    })

    it('should throw an EmailAlreadyInUse if GetUserByEmailRepository return an user', async () => {
        const { sut, getUserByEmailRepository } = makeSut()
        import.meta.jest
            .spyOn(getUserByEmailRepository, 'execute')
            .mockReturnValueOnce(user)

        const promise = sut.execute(user)

        await expect(promise).rejects.toThrow(new EmailAlreadyInUse())
    })
})
