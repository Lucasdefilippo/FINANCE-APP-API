import { faker } from '@faker-js/faker'
import { GetUserByIdUseCase } from '../../../use-cases/index.js'

describe('Get User By Id Use Case', () => {
    const userId = {
        id: faker.string.uuid(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 7 }),
    }
    class GetUserByIdRepoitoryStub {
        async execute() {
            return userId
        }
    }

    const makeSut = () => {
        const getUserByIdRepository = new GetUserByIdRepoitoryStub()
        const sut = new GetUserByIdUseCase(getUserByIdRepository)

        return { sut, getUserByIdRepository }
    }

    it('should returns user successfully', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(userId)

        expect(result).toEqual(userId)
    })

    it('should throws if GetUserByIdRepository throws', async () => {
        const { sut, getUserByIdRepository } = makeSut()
        jest.spyOn(getUserByIdRepository, 'execute').mockRejectedValue(
            new Error(),
        )

        const result = sut.execute(userId)

        await expect(result).rejects.toThrow()
    })

    it('should call GetUserByIdRepository with corrected params', async () => {
        const { sut, getUserByIdRepository } = makeSut()
        const spy = jest.spyOn(getUserByIdRepository, 'execute')

        await sut.execute(userId)

        expect(spy).toHaveBeenCalledWith(userId)
    })
})
