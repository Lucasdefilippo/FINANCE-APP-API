import { prisma } from '../../../../prisma/prisma.js'
import { PostgresGetUserByEmailRepository } from '../../../repositories/postgres/user/get-user-by-email.js'
import { user } from '../../fixtures/user.js'

describe('PostgresGetUserByEmailRepository', () => {
    it('should get user by email on db', async () => {
        const fakeUser = await prisma.user.create({ data: user })

        const sut = new PostgresGetUserByEmailRepository()

        const result = await sut.execute(fakeUser.email)

        expect(result).toStrictEqual(user)
    })
})
