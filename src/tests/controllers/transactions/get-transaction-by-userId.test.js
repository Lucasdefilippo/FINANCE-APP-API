import { faker } from '@faker-js/faker'
import { GetTransactionsByUserIdController } from '../../../controllers/transactions/get-transaction-by-userId.js'
import { UserNotFoundError } from '../../../errors/user'

describe('GetTransactionById', () => {
    class GetTransactionByIdUseCaseStub {
        async execute(userId) {
            return [
                {
                    id: faker.string.uuid(),
                    user_id: userId,
                    name: faker.finance.currencyName(),
                    date: faker.date.anytime().toISOString(),
                    amount: Number(faker.finance.amount()),
                    type: 'EARNING',
                },
                {
                    id: faker.string.uuid(),
                    user_id: userId,
                    name: faker.finance.currencyName(),
                    date: faker.date.anytime().toISOString(),
                    amount: Number(faker.finance.amount()),
                    type: 'EXPENSE',
                },
            ]
        }
    }

    const makeSut = () => {
        const getTransactionsByUserIdUseCase =
            new GetTransactionByIdUseCaseStub()
        const sut = new GetTransactionsByUserIdController(
            getTransactionsByUserIdUseCase,
        )

        return { getTransactionsByUserIdUseCase, sut }
    }

    const httpRequest = {
        query: {
            userId: faker.string.uuid(),
        },
    }

    it('should returs 200 if getting all transactions', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(200)
    })

    it('should returns 400 if is not provided userId', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            query: { userId: undefined },
        })

        expect(result.statusCode).toBe(400)
    })

    it('should returns 400 if provided UserId is invalid', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            query: { userId: 'Invalid_UserId' },
        })

        expect(result.statusCode).toBe(400)
    })

    it('should returns 404 if GetTransactionsByUserIdUseCase throws generic error', async () => {
        const { sut, getTransactionsByUserIdUseCase } = makeSut()
        jest.spyOn(
            getTransactionsByUserIdUseCase,
            'execute',
        ).mockRejectedValueOnce(new UserNotFoundError())

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(404)
    })

    it('should returns 500 if GetTransactionsByUserIdUseCase throws generic error', async () => {
        const { sut, getTransactionsByUserIdUseCase } = makeSut()
        jest.spyOn(
            getTransactionsByUserIdUseCase,
            'execute',
        ).mockRejectedValueOnce(new Error())

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(500)
    })

    it('should call GetTransactionByUserIdUseCase with corrected params', async () => {
        const { sut, getTransactionsByUserIdUseCase } = makeSut()
        const executeSpy = jest.spyOn(getTransactionsByUserIdUseCase, 'execute')

        await sut.execute(httpRequest)

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.query.userId)
    })
})
