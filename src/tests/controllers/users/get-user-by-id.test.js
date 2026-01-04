import { faker } from '@faker-js/faker'
import { GetUserByIdController } from '../../../../src/controllers/user/get-user-by-id.js'

describe('GetUserByIdController', () => {
    class GetUserByIdUseCaseStub {
        async execute(userId) {
            return {
                id: userId,
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 7 }),
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
        jest.spyOn(getUserByIdUseCase, 'execute').mockImplementationOnce(() => {
            return null
        })
        //act
        const result = await getUserByIdController.execute(httpRequest)
        //assert
        expect(result.statusCode).toBe(404)
    })
})
