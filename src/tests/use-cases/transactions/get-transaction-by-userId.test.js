import { faker } from '@faker-js/faker'
import { GetTransactionsByUserIdUseCase } from '../../../use-cases/index.js'
import { UserNotFoundError } from '../../../errors/user'
import { user } from '../../index.js'

describe('Get Transaction By User Id', () => {
    const from = '2026-02-02'
    const to = '2026-02-02'

    class GetTransactionByUserIdRepositoryStub {
        async execute() {
            return []
        }
    }

    class GetUserByIdRepositoryStub {
        async execute() {
            return user
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

        const result = await sut.execute(user.id, from, to)

        expect(result).toEqual([])
    })

    it('should throw UserNotFoundError if user does not exist', async () => {
        const { sut, getUserByIdRepository } = makeSut()
        import.meta.jest
            .spyOn(getUserByIdRepository, 'execute')
            .mockResolvedValueOnce(null)
        const id = faker.string.uuid()

        const promise = sut.execute(id)

        await expect(promise).rejects.toThrow(new UserNotFoundError(id))
    })

    it('should throws if GetTransactionByUserIdRepository throws', async () => {
        const { sut, getTransactionsbyUserIdRepository } = makeSut()
        import.meta.jest
            .spyOn(getTransactionsbyUserIdRepository, 'execute')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute(user.id, from, to)

        await expect(promise).rejects.toThrow()
    })

    it('should call GetTransactionByuserIdRepository with correct params', async () => {
        const { sut, getTransactionsbyUserIdRepository } = makeSut()
        const spy = import.meta.jest.spyOn(
            getTransactionsbyUserIdRepository,
            'execute',
        )

        const id = faker.string.uuid()

        await sut.execute(id, from, to)

        expect(spy).toHaveBeenCalledWith(id, from, to)
    })
})
