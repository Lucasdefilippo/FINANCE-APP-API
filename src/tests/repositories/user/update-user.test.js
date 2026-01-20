import { faker } from '@faker-js/faker'
import { prisma } from '../../../../prisma/prisma'
import { PostgresUpdateUser } from '../../../repositories/postgres/user/update-user'
import { user as fakeUser } from '../../fixtures/user'

describe('PostgresUpdateUserRepository', () => {
    const updateUserParams = {
        id: faker.string.uuid(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 8 }),
    }

    it('should update user on db', async () => {
        const user = await prisma.user.create({ data: fakeUser })
        const sut = new PostgresUpdateUser()

        const result = await sut.execute(user.id, updateUserParams)

        expect(result).toStrictEqual(updateUserParams)
    })

    it('should call Prisma with correct params', async () => {
        const user = await prisma.user.create({ data: fakeUser })
        const sut = new PostgresUpdateUser()
        const prismaSpy = jest.spyOn(prisma.user, 'update')

        await sut.execute(user.id, updateUserParams)

        expect(prismaSpy).toHaveBeenCalledWith({
            where: { id: user.id },
            data: updateUserParams,
        })
    })

    it('should throw if Prisma throws', async () => {
        const sut = new PostgresUpdateUser()
        jest.spyOn(prisma.user, 'update').mockRejectedValueOnce(new Error())

        const promise = sut.execute(updateUserParams)

        await expect(promise).rejects.toThrow()
    })
})
