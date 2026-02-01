import { InvalidPasswordError, UserNotFoundError } from '../../../errors/user'
import { LoginUserUseCase } from '../../../use-cases/user/login-user'
import { user } from '../../index.js'

describe('Login User Use Case', () => {
    class GetUserByEmailRepositoryStub {
        async execute() {
            return user
        }
    }

    class PasswordComparatorAdapterStub {
        execute() {
            return true
        }
    }

    class TokensGeneratorAdapterStub {
        execute() {
            return {
                accessToken: 'any_token',
                refreshToken: 'any_refresh_token',
            }
        }
    }

    const makeSut = () => {
        const getUserByEmailRepository = new GetUserByEmailRepositoryStub()
        const passwordComparatorAdapter = new PasswordComparatorAdapterStub()
        const tokensGeneratorAdapter = new TokensGeneratorAdapterStub()
        const sut = new LoginUserUseCase(
            getUserByEmailRepository,
            passwordComparatorAdapter,
            tokensGeneratorAdapter,
        )

        return { sut, getUserByEmailRepository, passwordComparatorAdapter }
    }

    it('should throw UserNotFoundError if user is not found', async () => {
        const { sut, getUserByEmailRepository } = makeSut()
        import.meta.jest
            .spyOn(getUserByEmailRepository, 'execute')
            .mockReturnValueOnce(null)

        const promise = sut.execute('invalid_email', 'invalid_password')

        await expect(promise).rejects.toThrow(new UserNotFoundError())
    })

    it('should throw PasswordInvalidError if password is invalid', async () => {
        const { sut, passwordComparatorAdapter } = makeSut()

        import.meta.jest
            .spyOn(passwordComparatorAdapter, 'execute')
            .mockReturnValueOnce(false)

        const promise = sut.execute('invalid_email', 'invalid_password')

        await expect(promise).rejects.toThrow(new InvalidPasswordError())
    })

    it('should return user with tokens', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(user.email, user.password)

        expect(result.tokens.accessToken).toBeDefined()
        expect(result.tokens.refreshToken).toBeDefined()
    })
})
