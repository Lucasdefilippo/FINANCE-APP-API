import { GetUserByIdUseCase } from '../../../use-cases/index.js'
import { user } from '../../fixtures/user.js'

describe('Get User By Id Use Case', () => {
    class GetUserByIdRepoitoryStub {
        async execute() {
            return user
        }
    }

    const makeSut = () => {
        const getUserByIdRepository = new GetUserByIdRepoitoryStub()
        const sut = new GetUserByIdUseCase(getUserByIdRepository)

        return { sut, getUserByIdRepository }
    }

    it('should returns user successfully', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(user)

        expect(result).toEqual(user)
    })

    it('should throws if GetUserByIdRepository throws', async () => {
        const { sut, getUserByIdRepository } = makeSut()
        jest.spyOn(getUserByIdRepository, 'execute').mockRejectedValue(
            new Error(),
        )

        const result = sut.execute(user)

        await expect(result).rejects.toThrow()
    })

    it('should call GetUserByIdRepository with corrected params', async () => {
        const { sut, getUserByIdRepository } = makeSut()
        const spy = jest.spyOn(getUserByIdRepository, 'execute')

        await sut.execute(user)

        expect(spy).toHaveBeenCalledWith(user)
    })
})
