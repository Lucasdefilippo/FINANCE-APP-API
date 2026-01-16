import { UpdateTransactionUseCase } from '../../../use-cases/index.js'
import { transaction } from '../../index.js'

describe('Update Transaction Use Case', () => {
    class UpdateTransactionRepositoryStub {
        async execute(transactionId) {
            return {
                id: transactionId,
                ...transaction,
            }
        }
    }

    const makeSut = () => {
        const updateTransactionRepository =
            new UpdateTransactionRepositoryStub()
        const sut = new UpdateTransactionUseCase(updateTransactionRepository)

        return { sut, updateTransactionRepository }
    }

    it('should update a transaction with successfully', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(transaction.id, { name: 'new_name' })

        expect(result).toEqual(transaction)
    })

    it('should call UpdateTransactionRepository with correct params', async () => {
        const { sut, updateTransactionRepository } = makeSut()
        const spy = jest.spyOn(updateTransactionRepository, 'execute')

        await sut.execute(transaction.id, { name: 'new_name' })

        expect(spy).toHaveBeenCalledWith(transaction.id, { name: 'new_name' })
    })

    it('should throw if UpdateTransactionRepository throws', async () => {
        const { sut, updateTransactionRepository } = makeSut()
        jest.spyOn(
            updateTransactionRepository,
            'execute',
        ).mockRejectedValueOnce(new Error())

        const promise = sut.execute(transaction.id, { name: 'new_name' })

        await expect(promise).rejects.toThrow()
    })
})
