import { faker } from '@faker-js/faker'
import { prisma } from '../../../../prisma/prisma'
import { PostgresGetUserBalanceRepository } from '../../../repositories/postgres/user/get-user-balance'
import { user as userFake } from '../../fixtures/user'

describe('PostgresGetUserBalanceRepository', () => {
    it('should get user balance on db', async () => {
        const user = await prisma.user.create({ data: userFake })

        await prisma.transaction.createMany({
            data: [
                {
                    amount: 5000,
                    type: 'EARNING',
                    user_id: user.id,
                    name: 'teste',
                    date: faker.date.anytime().toISOString(),
                },
                {
                    amount: 5000,
                    type: 'EARNING',
                    user_id: user.id,
                    name: 'teste',
                    date: faker.date.anytime().toISOString(),
                },
                {
                    amount: 1000,
                    type: 'EXPENSE',
                    user_id: user.id,
                    name: 'teste',
                    date: faker.date.anytime().toISOString(),
                },
                {
                    amount: 1000,
                    type: 'EXPENSE',
                    user_id: user.id,
                    name: 'teste',
                    date: faker.date.anytime().toISOString(),
                },
                {
                    amount: 2000,
                    type: 'INVESTMENT',
                    user_id: user.id,
                    name: 'teste',
                    date: faker.date.anytime().toISOString(),
                },
                {
                    amount: 2000,
                    type: 'INVESTMENT',
                    user_id: user.id,
                    name: 'teste',
                    date: faker.date.anytime().toISOString(),
                },
            ],
        })

        const sut = new PostgresGetUserBalanceRepository()

        const result = await sut.execute(user.id)

        expect(result.earnings.toString()).toBe('10000')
        expect(result.expenses.toString()).toBe('2000')
        expect(result.investments.toString()).toBe('4000')
        expect(result.balance.toString()).toBe('4000')
    })

    it('should call prisma with correct params', async () => {
        const sut = new PostgresGetUserBalanceRepository()
        const prismaSpy = jest.spyOn(prisma.transaction, 'aggregate')

        await sut.execute(userFake.id)

        expect(prismaSpy).toHaveBeenCalledTimes(3)
        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                user_id: userFake.id,
                type: 'EARNING',
            },
            _sum: {
                amount: true,
            },
        })
        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                user_id: userFake.id,
                type: 'EXPENSE',
            },
            _sum: {
                amount: true,
            },
        })
        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                user_id: userFake.id,
                type: 'INVESTMENT',
            },
            _sum: {
                amount: true,
            },
        })
    })

    it('should throw if Prisma throws', async () => {
        const sut = new PostgresGetUserBalanceRepository()
        jest.spyOn(prisma.transaction, 'aggregate').mockRejectedValueOnce(
            new Error(),
        )

        const promise = sut.execute(userFake.id)

        await expect(promise).rejects.toThrow()
    })
})
