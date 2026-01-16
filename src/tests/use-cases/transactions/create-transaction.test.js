import { CreateTransactionUseCase } from '../../../use-cases/index.js'
import { UserNotFoundError } from '../../../errors/user'
import { transaction, user } from '../../index.js'

describe('Create Transaction Use Case', () => {
    class CreateTransactionRepositoryStub {
        async execute(transaction) {
            return transaction
        }
    }

    class IdGeneratorAdapterStub {
        async execute() {
            return 'random_id'
        }
    }

    class GetUserByIdRepositoryStub {
        async execute(userId) {
            return { ...user, id: userId }
        }
    }

    const makeSut = () => {
        const createTransactionRepository =
            new CreateTransactionRepositoryStub()
        const idGeneratorAdapter = new IdGeneratorAdapterStub()
        const getUserByIdRepository = new GetUserByIdRepositoryStub()

        const sut = new CreateTransactionUseCase(
            createTransactionRepository,
            getUserByIdRepository,
            idGeneratorAdapter,
        )

        return {
            sut,
            createTransactionRepository,
            idGeneratorAdapter,
            getUserByIdRepository,
        }
    }
    it('should create transaction successfully', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(transaction)

        expect(result).toEqual({ ...transaction, id: 'random_id' })
    })

    it('should call GetUserByIdRepository with correct params', async () => {
        const { sut, getUserByIdRepository } = makeSut()
        const spy = jest.spyOn(getUserByIdRepository, 'execute')

        await sut.execute(transaction)

        expect(spy).toHaveBeenCalledWith(transaction.user_id)
    })

    it('should call IdGeneratorAdaptor', async () => {
        const { sut, idGeneratorAdapter } = makeSut()
        const spy = jest.spyOn(idGeneratorAdapter, 'execute')

        await sut.execute(transaction)

        expect(spy).toHaveBeenCalled()
    })

    it('should call CreateTransactionRepository with correct params', async () => {
        const { sut, createTransactionRepository } = makeSut()
        const spy = jest.spyOn(createTransactionRepository, 'execute')

        await sut.execute(transaction)

        expect(spy).toHaveBeenCalledWith({
            ...transaction,
            id: 'random_id',
        })
    })

    it('should throw UserNotFoundError if user does not exist', async () => {
        const { sut, getUserByIdRepository } = makeSut()
        jest.spyOn(getUserByIdRepository, 'execute').mockResolvedValue(null)

        const promise = sut.execute(transaction)

        await expect(promise).rejects.toThrow(
            new UserNotFoundError(transaction.user_id),
        )
    })

    it('should throw if GetUserByIdRepository throws', async () => {
        const { sut, getUserByIdRepository } = makeSut()
        jest.spyOn(getUserByIdRepository, 'execute').mockRejectedValue(
            new Error(),
        )

        const promise = sut.execute(transaction)

        await expect(promise).rejects.toThrow()
    })

    it('should throw if IdGeneratorAdapter throws', async () => {
        const { sut, idGeneratorAdapter } = makeSut()
        jest.spyOn(idGeneratorAdapter, 'execute').mockRejectedValue(new Error())

        const promise = sut.execute(transaction)

        await expect(promise).rejects.toThrow()
    })

    it('should throw if CreateTransactionRepository throws', async () => {
        const { sut, createTransactionRepository } = makeSut()
        jest.spyOn(createTransactionRepository, 'execute').mockRejectedValue(
            new Error(),
        )

        const promise = sut.execute(transaction)

        await expect(promise).rejects.toThrow()
    })
})
