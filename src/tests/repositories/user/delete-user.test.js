import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'
import { prisma } from '../../../../prisma/prisma'
import { PostgresDeleteUserRepository } from '../../../repositories/postgres/user/delete-user'
import { user } from '../../fixtures/user'
import { UserNotFoundError } from '../../../errors/user'

describe('Postgres Delete User Repository', () => {
    it('should delete a user on db', async () => {
        await prisma.user.create({ data: user })

        const sut = new PostgresDeleteUserRepository()

        const result = await sut.execute(user.id)

        expect(result).toStrictEqual(user)
    })

    it('should call prisma with correct params', async () => {
        await prisma.user.create({ data: user })
        const sut = new PostgresDeleteUserRepository(user.id)
        const prismaSpy = jest.spyOn(prisma.user, 'delete')

        await sut.execute(user.id)

        expect(prismaSpy).toHaveBeenCalledWith({ where: { id: user.id } })
    })

    it('should throws a generic error if Prisma throws generic error', async () => {
        const sut = new PostgresDeleteUserRepository()
        jest.spyOn(prisma.user, 'delete').mockRejectedValueOnce(new Error())

        const promise = sut.execute(user.id)

        await expect(promise).rejects.toThrow()
    })

    it('should throws UserNotFoundError if Prisma throws error code P2025', async () => {
        const sut = new PostgresDeleteUserRepository()
        jest.spyOn(prisma.user, 'delete').mockRejectedValueOnce(
            new PrismaClientKnownRequestError('', { code: 'P2025' }),
        )

        const promise = sut.execute(user.id)

        await expect(promise).rejects.toThrow(new UserNotFoundError(user.id))
    })
})
