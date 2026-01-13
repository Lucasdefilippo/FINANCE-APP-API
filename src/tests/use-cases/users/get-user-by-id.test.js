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
})
