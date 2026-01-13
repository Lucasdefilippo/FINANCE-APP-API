import { faker } from '@faker-js/faker'
import { GetUserBalanceUseCase } from '../../../use-cases/user/get-user-balance'

describe('Get User Balance Use Case', () => {
    class GetUserBalanceRepositoryStub {
        async execute() {
            return {
                expense: 100,
                investment: 1000,
                earning: 10000,
                balance: 8000,
            }
        }
    }

    class GetUserByIdRepositoryStub {
        async execute() {
            return 'user_ID'
        }
    }

    const makeSut = () => {
        const getUserBalanceRepository = new GetUserBalanceRepositoryStub()
        const getUserByIdRespoitory = new GetUserByIdRepositoryStub()

        const sut = new GetUserBalanceUseCase(
            getUserBalanceRepository,
            getUserByIdRespoitory,
        )

        return { getUserBalanceRepository, getUserByIdRespoitory, sut }
    }

    it('should returns successfully balance user', async () => {
        const { sut } = makeSut()
        const result = await sut.execute(faker.string.uuid())

        expect(result).toBeTruthy()
    })
})
