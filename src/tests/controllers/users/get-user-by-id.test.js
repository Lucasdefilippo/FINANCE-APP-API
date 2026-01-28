import { faker } from '@faker-js/faker'
import { GetUserByIdController } from '../../../../src/controllers/index.js'
import { user } from '../../fixtures/user.js'

describe('GetUserByIdController', () => {
    class GetUserByIdUseCaseStub {
        async execute(userId) {
            return {
                ...user,
                id: userId,
            }
        }
    }

    const makeSut = () => {
        const getUserByIdUseCase = new GetUserByIdUseCaseStub()
        const getUserByIdController = new GetUserByIdController(
            getUserByIdUseCase,
        )

        return { getUserByIdUseCase, getUserByIdController }
    }

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
    }

    it('should GetUserByIdController returns 200 if getting user', async () => {
        //arrange
        const { getUserByIdController } = makeSut()
        //act
        const result = await getUserByIdController.execute(httpRequest)
        //assert
        expect(result.statusCode).toBe(200)
    })

    it('should returs 400 if UserId is invalid', async () => {
        //arrange
        const { getUserByIdController } = makeSut()
        //act
        const result = await getUserByIdController.execute({
            params: {
                userId: 'Invalid_Id',
            },
        })
        //assert
        expect(result.statusCode).toBe(400)
    })

    it('should returns 404 if user is not found', async () => {
        //arrange
        const { getUserByIdController, getUserByIdUseCase } = makeSut()
        import.meta.jest
            .spyOn(getUserByIdUseCase, 'execute')
            .mockImplementationOnce(() => {
                return null
            })
        //act
        const result = await getUserByIdController.execute(httpRequest)
        //assert
        expect(result.statusCode).toBe(404)
    })

    it('should returns 500 if GetUserUseCase throws', async () => {
        //arrange
        const { getUserByIdController, getUserByIdUseCase } = makeSut()
        import.meta.jest
            .spyOn(getUserByIdUseCase, 'execute')
            .mockRejectedValueOnce(new Error())
        //act
        const result = await getUserByIdController.execute(httpRequest)
        //assert
        expect(result.statusCode).toBe(500)
    })

    it('should call GetUserByIdUseCase with corrected params', async () => {
        const { getUserByIdController, getUserByIdUseCase } = makeSut()
        const executeSpy = import.meta.jest.spyOn(getUserByIdUseCase, 'execute')

        await getUserByIdController.execute(httpRequest)

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.params.userId)
    })
})
