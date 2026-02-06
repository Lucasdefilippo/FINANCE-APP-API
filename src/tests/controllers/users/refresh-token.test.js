import { RefreshTokenController } from '../../../controllers/user/refresh-token'
import { UnauthorizedError } from '../../../errors/user.js'

describe('Refresh Token Controller', () => {
    class RefreshTokenUseCaseStub {
        execute() {
            return {
                accesToken: 'any_access_token',
                refreshToken: 'any_refresh_token',
            }
        }
    }

    const makeSut = () => {
        const refreshTokenUseCase = new RefreshTokenUseCaseStub()

        const sut = new RefreshTokenController(refreshTokenUseCase)

        return { sut, refreshTokenUseCase }
    }

    it('should return 200 if refresh token is valid', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: { refreshToken: 'any_refresh_token' },
        }

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(200)
    })

    it('should return 400 if refresh token is invalid', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                refreshToken: 1,
            },
        }

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })

    it('should return 401 if unauthorized', async () => {
        const { sut, refreshTokenUseCase } = makeSut()
        const httpRequest = {
            body: { refreshToken: 'any_refresh_token' },
        }

        import.meta.jest
            .spyOn(refreshTokenUseCase, 'execute')
            .mockImplementationOnce(() => {
                throw new UnauthorizedError()
            })

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(401)
    })
})
