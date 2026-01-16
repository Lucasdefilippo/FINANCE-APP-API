import { faker } from '@faker-js/faker'
import { DeleteTransactionUseCase } from '../../../use-cases/index.js'
import { transaction } from '../../index.js'

describe('Delete Transaction Use Case', () => {
    const transactionId = faker.string.uuid()

    class DeleteTransactionRepositoryStub {
        async execute(transactionId) {
            return {
                ...transaction,
                id: transactionId,
            }
        }
    }

    const makeSut = () => {
        const deleteTransactionRepository =
            new DeleteTransactionRepositoryStub()
        const sut = new DeleteTransactionUseCase(deleteTransactionRepository)

        return { sut, deleteTransactionRepository }
    }

    it('should delete transaction with successfully', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(transactionId)

        expect(result).toEqual({ ...transaction, id: transactionId })
    })

    it('should call DeleteTransactionRepository with correct params', async () => {
        const { sut, deleteTransactionRepository } = makeSut()
        const spy = jest.spyOn(deleteTransactionRepository, 'execute')

        await sut.execute(transactionId)

        expect(spy).toHaveBeenCalledWith(transactionId)
    })

    it('should DeleteTransactionUseCase throws if DeleteTransactionRepository throw', async () => {
        const { sut, deleteTransactionRepository } = makeSut()
        jest.spyOn(
            deleteTransactionRepository,
            'execute',
        ).mockRejectedValueOnce(new Error())

        const promise = sut.execute(transactionId)

        await expect(promise).rejects.toThrow()
    })
})
