import { prisma } from '../../../../prisma/prisma'
import { PostgresDeleteUserRepository } from '../../../repositories/postgres/user/delete-user'
import { user } from '../../fixtures/user'

describe('Postgres Delete User Repository', () => {
    it('should delete a user on db', async () => {
        await prisma.user.create({ data: user })

        const sut = new PostgresDeleteUserRepository()

        const result = await sut.execute(user.id)

        expect(result).toStrictEqual(user)
    })
})
