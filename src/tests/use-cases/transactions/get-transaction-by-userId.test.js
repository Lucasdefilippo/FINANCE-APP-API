import { faker } from '@faker-js/faker'
import { GetTransactionsByUserIdUseCase } from '../../../use-cases/transaction/get-transaction-by-userId'
import { UserNotFoundError } from '../../../errors/user'

describe('Get Transaction By User Id', () => {
    const userId = faker.string.uuid()

    class GetTransactionByUserIdRepositoryStub {
        async execute() {
            return []
        }
    }

    class GetUserByIdRepositoryStub {
        async execute() {
            return userId
        }
    }

    const makeSut = () => {
        const getTransactionsbyUserIdRepository =
            new GetTransactionByUserIdRepositoryStub()
        const getUserByIdRepository = new GetUserByIdRepositoryStub()

        const sut = new GetTransactionsByUserIdUseCase(
            getTransactionsbyUserIdRepository,
            getUserByIdRepository,
        )

        return { sut, getTransactionsbyUserIdRepository, getUserByIdRepository }
    }

    it('should get transactions by userId with successfully', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(userId)

        expect(result).toEqual([])
    })

    it('should throw UserNotFoundError if user does not exist', async () => {
        const { sut, getUserByIdRepository } = makeSut()
        jest.spyOn(getUserByIdRepository, 'execute').mockRejectedValueOnce(
            new UserNotFoundError(),
        )

        const promise = sut.execute(userId)

        await expect(promise).rejects.toThrow()
    })
})
