import { faker } from '@faker-js/faker'
import { DeleteUserController } from '../../../../src/controllers/user/delete-user.js'

describe('DeleteUserController', () => {
    class DeleteUserUseCaseStub {
        async execute() {
            return {
                id: faker.string.uuid(),
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 7 }),
            }
        }
    }

    const makeSut = () => {
        const deleteUserUseCase = new DeleteUserUseCaseStub()
        const deleteUserController = new DeleteUserController(deleteUserUseCase)

        return { deleteUserUseCase, deleteUserController }
    }

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
    }

    it('should return 200 if user is deleted', async () => {
        //arrange
        const { deleteUserController } = makeSut()
        //act
        const result = await deleteUserController.execute(httpRequest)
        //assert
        expect(result.statusCode).toBe(200)
    })

    it('should return 400 if Id is invalid', async () => {
        const { deleteUserController } = makeSut()

        const result = await deleteUserController.execute({
            params: { userId: 'Invalid_Id' },
        })

        expect(result.statusCode).toBe(400)
    })

    it('should returns 404 if user is not found', async () => {
        //arrange
        const { deleteUserController, deleteUserUseCase } = makeSut()
        jest.spyOn(deleteUserUseCase, 'execute').mockReturnValueOnce(null)
        //adc
        const result = await deleteUserController.execute(httpRequest)
        //assert
        expect(result.statusCode).toBe(404)
    })

    it('should return 500 if DeleteUserUseCase throws', async () => {
        //arrange
        const { deleteUserController, deleteUserUseCase } = makeSut()
        jest.spyOn(deleteUserUseCase, 'execute').mockImplementationOnce(() => {
            throw new Error()
        })
        //act
        const result = await deleteUserController.execute(httpRequest)
        //assert
        expect(result.statusCode).toBe(500)
    })

    it('should call DeleteUserUseCase with corrected params', async () => {
        const { deleteUserController, deleteUserUseCase } = makeSut()
        const executeSpy = jest.spyOn(deleteUserUseCase, 'execute')

        await deleteUserController.execute(httpRequest)

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.params.userId)
    })
})
