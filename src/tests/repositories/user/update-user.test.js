import { faker } from '@faker-js/faker'
import { prisma } from '../../../../prisma/prisma'
import { PostgresUpdateUser } from '../../../repositories/postgres/user/update-user'
import { user as fakeUser } from '../../fixtures/user'

describe('PostgresUpdateUserRepository', () => {
    it('should update user on db', async () => {
        const user = await prisma.user.create({ data: fakeUser })
        const sut = new PostgresUpdateUser()
        const updateUserParams = {
            id: faker.string.uuid(),
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 8 }),
        }

        const result = await sut.execute(user.id, updateUserParams)

        expect(result).toStrictEqual(updateUserParams)
    })
})
