import { faker } from '@faker-js/faker'
import { GetUserBalanceController } from '../../../../src/controllers/user/get-user-balance.js'

describe('GetUserBalanceController', () => {
    class GetUserBalanceUseCaseStub {
        async execute() {
            return faker.number.int()
        }
    }

    const makeSut = () => {
        const getUserBalanceUseCase = new GetUserBalanceUseCaseStub()
        const getUserBalanceController = new GetUserBalanceController(
            getUserBalanceUseCase,
        )

        return { getUserBalanceController, getUserBalanceUseCase }
    }

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
    }

    it('should return 200 on when getting user balance', async () => {
        //arrange

        const { getUserBalanceController } = makeSut()

        //act

        const result = await getUserBalanceController.execute(httpRequest)

        //acert

        expect(result.statusCode).toBe(200)
    })

    it('should retur 400 when userId is invalid', async () => {
        //arrange
        const { getUserBalanceController } = makeSut()
        //act
        const result = await getUserBalanceController.execute({
            params: { userId: 'Invalid_ID' },
        })
        //assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 500 if GetUserBalanceUseCase throws', async () => {
        //arrange
        const { getUserBalanceController, getUserBalanceUseCase } = makeSut()
        jest.spyOn(getUserBalanceUseCase, 'execute').mockRejectedValueOnce(
            new Error(),
        )
        //act
        const result = await getUserBalanceController.execute(httpRequest)
        //assert
        expect(result.statusCode).toBe(500)
    })
})
