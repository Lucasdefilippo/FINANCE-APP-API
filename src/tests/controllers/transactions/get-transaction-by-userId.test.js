import { faker } from '@faker-js/faker'
import { GetTransactionsByUserIdController } from '../../../controllers/index.js'
import { UserNotFoundError } from '../../../errors/user'

describe('GetTransactionById', () => {
    const from = '2026-01-01'
    const to = '2026-02-01'

    class GetTransactionByIdUseCaseStub {
        async execute() {
            return []
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
        body: { userId: faker.string.uuid() },
        query: {
            from: from,
            to: to,
        },
    }

    it('should returs 200 if getting all transactions', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(200)
    })

    it('should returns 404 if GetTransactionsByUserIdUseCase throws generic error', async () => {
        const { sut, getTransactionsByUserIdUseCase } = makeSut()
        import.meta.jest
            .spyOn(getTransactionsByUserIdUseCase, 'execute')
            .mockRejectedValueOnce(new UserNotFoundError())

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(404)
    })

    it('should returns 500 if GetTransactionsByUserIdUseCase throws generic error', async () => {
        const { sut, getTransactionsByUserIdUseCase } = makeSut()
        import.meta.jest
            .spyOn(getTransactionsByUserIdUseCase, 'execute')
            .mockRejectedValueOnce(new Error())

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(500)
    })

    it('should call GetTransactionByUserIdUseCase with corrected params', async () => {
        const { sut, getTransactionsByUserIdUseCase } = makeSut()
        const executeSpy = import.meta.jest.spyOn(
            getTransactionsByUserIdUseCase,
            'execute',
        )

        await sut.execute(httpRequest)

        expect(executeSpy).toHaveBeenCalledWith(
            httpRequest.body.userId,
            httpRequest.query.from,
            httpRequest.query.to,
        )
    })
})
