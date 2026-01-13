import { faker } from '@faker-js/faker'
import { GetUserBalanceUseCase } from '../../../use-cases/user/get-user-balance.js'
import { UserNotFoundError } from '../../../errors/user.js'

describe('Get User Balance Use Case', () => {
    const userBalance = {
        expense: faker.finance.amount(),
        investment: faker.finance.amount(),
        earning: faker.finance.amount(),
        balance: faker.finance.amount(),
    }

    class GetUserBalanceRepositoryStub {
        async execute() {
            return userBalance
        }
    }

    class GetUserByIdRepositoryStub {
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
        const getUserBalanceRepository = new GetUserBalanceRepositoryStub()
        const getUserByIdRespoitory = new GetUserByIdRepositoryStub()

        const sut = new GetUserBalanceUseCase(
            getUserBalanceRepository,
            getUserByIdRespoitory,
        )

        return { getUserBalanceRepository, getUserByIdRespoitory, sut }
    }

    it('should returns successfully balance user', async () => {
        const { sut } = makeSut()
        const result = await sut.execute(faker.string.uuid())

        expect(result).toEqual(userBalance)
    })

    it('should throw UserNotFoundError if GetUserByIdRepository returns null', async () => {
        const { sut, getUserByIdRespoitory } = makeSut()
        jest.spyOn(getUserByIdRespoitory, 'execute').mockResolvedValueOnce(null)
        const userId = faker.string.uuid()

        const promise = sut.execute(userId)

        await expect(promise).rejects.toThrow(new UserNotFoundError(userId))
    })

    it('should call GetUserBalaceRepository with correted params', async () => {
        const { sut, getUserBalanceRepository } = makeSut()
        const spy = jest.spyOn(getUserBalanceRepository, 'execute')
        const userId = faker.string.uuid()

        await sut.execute(userId)

        expect(spy).toHaveBeenCalledWith(userId)
    })

    it('should call GetUserByIdRepository with correted params', async () => {
        const { sut, getUserByIdRespoitory } = makeSut()
        const spy = jest.spyOn(getUserByIdRespoitory, 'execute')
        const userId = faker.string.uuid()

        await sut.execute(userId)

        expect(spy).toHaveBeenCalledWith(userId)
    })

    it('should throw if GetuserByIdRepository throws', async () => {
        const { sut, getUserByIdRespoitory } = makeSut()
        jest.spyOn(getUserByIdRespoitory, 'execute').mockRejectedValue(
            new Error(),
        )

        const result = sut.execute(faker.string.uuid())

        await expect(result).rejects.toThrow()
    })
})
