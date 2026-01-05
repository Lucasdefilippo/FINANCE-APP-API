import { faker } from '@faker-js/faker'
import { CreateTransactionController } from '../../../../src/controllers/transactions/create-transaction.js'

describe('CreateTransactionController', () => {
    class CreateTransactionUseCaseStub {
        async execute(params) {
            return params
        }
    }

    const makeSut = () => {
        const createTransactionUseCase = new CreateTransactionUseCaseStub()
        const sut = new CreateTransactionController(createTransactionUseCase)

        return { createTransactionUseCase, sut }
    }

    const httpRequest = {
        body: {
            user_id: faker.string.uuid(),
            name: faker.finance.currencyName(),
            date: '2026-07-12T10:00:00Z',
            amount: Number(faker.finance.amount()),
            type: 'EARNING',
        },
    }

    it('should return 201 if create an transaction sucessfully', async () => {
        //arrange
        const { sut } = makeSut()
        //act
        const result = await sut.execute(httpRequest)
        //assert
        expect(result.statusCode).toBe(201)
    })
})
