import { prisma } from '../../../../prisma/prisma.js'
import { PostgresGetUserByIdRepository } from '../../../repositories/postgres/user/get-user-by-id.js'
import { user } from '../../fixtures/user.js'

describe('PostgresGetUserByIdRepository', () => {
    it('should get user by id on db', async () => {
        const userFake = await prisma.user.create({ data: user })

        const sut = new PostgresGetUserByIdRepository()

        const result = await sut.execute(userFake.id)

        expect(result).toStrictEqual(user)
    })

    it('should call Prisma with correct Params', async () => {
        const sut = new PostgresGetUserByIdRepository()
        const prismaSpy = jest.spyOn(prisma.user, 'findUnique')

        await sut.execute(user.id)

        expect(prismaSpy).toHaveBeenCalledWith({ where: { id: user.id } })
    })

    it('should throw if Prisma throws', async () => {
        const sut = new PostgresGetUserByIdRepository()
        jest.spyOn(prisma.user, 'findUnique').mockRejectedValueOnce(new Error())

        const promise = sut.execute(user.id)

        await expect(promise).rejects.toThrow()
    })
})
