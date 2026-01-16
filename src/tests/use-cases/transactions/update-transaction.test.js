import { faker } from '@faker-js/faker'
import { UpdateTransactionUseCase } from '../../../use-cases/index.js'

describe('Update Transaction Use Case', () => {
    const transaction = {
        id: faker.string.uuid(),
        user_id: faker.string.uuid(),
        name: faker.finance.currencyName(),
        date: faker.date.anytime().toISOString(),
        amount: Number(faker.finance.amount()),
        type: 'EARNING',
    }
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
})
