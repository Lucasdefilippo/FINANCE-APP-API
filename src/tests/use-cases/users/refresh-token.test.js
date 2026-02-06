import { UnauthorizedError } from '../../../errors/user'
import { RefreshTokenUseCase } from '../../../use-cases/user/refresh-token'

describe('Refresh Token Use Case', () => {
    class TokenGeneratorAdapterStub {
        execute() {
            return {
                accessToken: 'Any_token',
                refreshToken: 'Any_refresh_token',
            }
        }
    }

    class TokenVerifierAdapterStub {
        execute() {
            return true
        }
    }

    const makeSut = () => {
        const tokenGeneratorAdapter = new TokenGeneratorAdapterStub()
        const tokenVerifierAdapter = new TokenVerifierAdapterStub()

        const sut = new RefreshTokenUseCase(
            tokenGeneratorAdapter,
            tokenVerifierAdapter,
        )

        return { sut, tokenGeneratorAdapter, tokenVerifierAdapter }
    }

    it('shold return a new tokens', () => {
        const { sut } = makeSut()
        const refreshToken = 'Any_refresh_token'
        const result = sut.execute(refreshToken)

        expect(result).toEqual({
            accessToken: 'Any_token',
            refreshToken: 'Any_refresh_token',
        })
    })

    it('should a throws if tokenVerifyAdapter throws', () => {
        const { sut, tokenVerifierAdapter } = makeSut()
        import.meta.jest
            .spyOn(tokenVerifierAdapter, 'execute')
            .mockImplementationOnce(() => {
                throw new UnauthorizedError()
            })

        expect(() => sut.execute('Any_refresh_token')).toThrow(
            new UnauthorizedError(),
        )
    })
})
