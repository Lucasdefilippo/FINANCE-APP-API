import { faker } from '@faker-js/faker'
import { DeleteUserUseCase } from '../../../use-cases/user/delete-user'

describe('Delete User Use Case', () => {
    class DeleteUserRepositoryStub {
        async execute(userID) {
            return {
                ID: userID,
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 7 }),
            }
        }
    }

    const makeSut = () => {
        const deleteUserRepository = new DeleteUserRepositoryStub()

        const sut = new DeleteUserUseCase(deleteUserRepository)

        return { sut, deleteUserRepository }
    }

    const userID = faker.string.uuid()

    it('should delete user with successfully', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(userID)

        expect(result.ID).toEqual(userID)
    })

    it('should call DeleteUserRepository with corrected params', async () => {
        const { sut, deleteUserRepository } = makeSut()
        const spyOn = jest.spyOn(deleteUserRepository, 'execute')

        await sut.execute(userID)
        expect(spyOn).toHaveBeenCalledWith(userID)
    })

    it('should throw if DeleteUserRepository returns throws', async () => {
        const { sut, deleteUserRepository } = makeSut()
        jest.spyOn(deleteUserRepository, 'execute').mockRejectedValueOnce(
            new Error(),
        )

        const promise = sut.execute(userID)

        await expect(promise).rejects.toThrow()
    })
})
