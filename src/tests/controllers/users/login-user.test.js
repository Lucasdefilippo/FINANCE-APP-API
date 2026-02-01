import { LoginUserController } from '../../../controllers/user/login-user'
import {
    InvalidPasswordError,
    UserNotFoundError,
} from '../../../errors/user.js'
import { user } from '../../fixtures/user.js'

describe('Login User Controller', () => {
    const httpRequest = {
        body: {
            email: user.email,
            password: user.password,
        },
    }

    class LoginUserUseCaseStub {
        async execute() {
            return {
                ...user,
                tokens: {
                    accessToken: 'any_token',
                    refreshToken: 'any_refresh_token',
                },
            }
        }
    }

    const makeSut = () => {
        const loginUserUseCase = new LoginUserUseCaseStub()
        const sut = new LoginUserController(loginUserUseCase)

        return { sut, loginUserUseCase }
    }

    it('should return 200 with user and tokens', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(200)
        expect(result.body.tokens.accessToken).toBe('any_token')
        expect(result.body.tokens.refreshToken).toBe('any_refresh_token')
    })

    it('shold return 401 if InvalidPasswordError', async () => {
        const { sut, loginUserUseCase } = makeSut()
        import.meta.jest
            .spyOn(loginUserUseCase, 'execute')
            .mockRejectedValueOnce(new InvalidPasswordError())

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(401)
    })

    it('should return 404 if UserNotFoundError', async () => {
        const { sut, loginUserUseCase } = makeSut()
        import.meta.jest
            .spyOn(loginUserUseCase, 'execute')
            .mockRejectedValueOnce(new UserNotFoundError())

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(404)
    })

    it('should return 500 if generic error', async () => {
        const { sut, loginUserUseCase } = makeSut()
        import.meta.jest
            .spyOn(loginUserUseCase, 'execute')
            .mockRejectedValueOnce(new Error())

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(500)
    })
})
