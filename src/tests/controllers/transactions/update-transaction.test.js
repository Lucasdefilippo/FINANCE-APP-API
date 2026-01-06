import { faker } from '@faker-js/faker'
import { UpdateTransactionController } from '../../../controllers/transactions/update-transaction'

describe('UpdateTransactionController', () => {
    class UpdateTransactionUseCaseStub {
        async execute(httpRequest) {
            return httpRequest
        }
    }

    const makeSut = () => {
        const updateTransactionUseCase = new UpdateTransactionUseCaseStub()
        const sut = new UpdateTransactionController(updateTransactionUseCase)

        return { sut, updateTransactionUseCase }
    }

    const httpRequest = {
        params: { transactionId: faker.string.uuid() },
        body: {
            user_id: faker.string.uuid(),
            name: faker.finance.currencyName(),
            date: faker.date.anytime().toISOString(),
            amount: Number(faker.finance.amount()),
            type: 'INVESTMENT',
        },
    }

    it('should return 200 if the transaction was updated', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(200)
    })

    it('should return 400 if transactionId is invalid', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            params: { transactionId: 'Invalid_transactionId' },
            body: { ...httpRequest.body },
        })

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if attempting to change the transactionId', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            params: { ...httpRequest.params },
            body: { ...httpRequest.body, transactionId: faker.string.uuid() },
        })

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if user_id provided is not valid', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            params: { ...httpRequest.params },
            body: {
                ...httpRequest.body,
                user_id: 'Invalid_UserId',
            },
        })

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if name provided is not valid', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            params: { ...httpRequest.params },
            body: {
                ...httpRequest.body,
                name: '',
            },
        })

        expect(result.statusCode).toBe(400)
    })
})
