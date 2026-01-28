import { prisma } from '../../../../prisma/prisma.js'
import { PostgresGetUserByEmailRepository } from '../../../repositories/postgres/user/get-user-by-email.js'
import { user } from '../../fixtures/user.js'

describe('PostgresGetUserByEmailRepository', () => {
    it('should get user by email on db', async () => {
        const userFake = await prisma.user.create({ data: user })

        const sut = new PostgresGetUserByEmailRepository()

        const result = await sut.execute(userFake.email)

        expect(result).toStrictEqual(user)
    })

    it('should call Prisma with correct Params', async () => {
        const sut = new PostgresGetUserByEmailRepository()
        const prismaSpy = import.meta.jest.spyOn(prisma.user, 'findUnique')

        await sut.execute(user.email)

        expect(prismaSpy).toHaveBeenCalledWith({ where: { email: user.email } })
    })

    it('should throw if Prisma throws', async () => {
        const sut = new PostgresGetUserByEmailRepository()
        import.meta.jest
            .spyOn(prisma.user, 'findUnique')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute(user.email)

        await expect(promise).rejects.toThrow()
    })
})
