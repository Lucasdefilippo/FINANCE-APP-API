import { faker } from '@faker-js/faker'
import { DeleteTransactionController } from '../../../../src/controllers/transactions/delete-transaction.js'

describe('DeleteTransactionController', () => {
    class DeleteTransactionUseCaseStub {
        async execute(transactionId) {
            return {
                id: transactionId,
                user_id: faker.string.uuid(),
                name: faker.finance.currencyName(),
                date: faker.date.anytime().toISOString(),
                amount: Number(faker.finance.amount()),
                type: 'EARNING',
            }
        }
    }

    const makeSut = () => {
        const deleteTransactionUseCase = new DeleteTransactionUseCaseStub()
        const sut = new DeleteTransactionController(deleteTransactionUseCase)

        return { sut, deleteTransactionUseCase }
    }

    const httpRequest = {
        params: { transactionId: faker.string.uuid() },
    }

    it('should return 200 if delete transaction with success', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(200)
    })

    it('should return 400 if id is invalid', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            params: { transactionId: 'Invalid_ID' },
        })

        expect(result.statusCode).toBe(400)
    })
})
