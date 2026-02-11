import { prisma } from '../../../../prisma/prisma'
import { PostgresGetUserBalanceRepository } from '../../../repositories/postgres/user/get-user-balance'
import { user as userFake } from '../../fixtures/user'

describe('PostgresGetUserBalanceRepository', () => {
    const from = '2026-01-01'
    const to = '2026-02-01'

    it('should get user balance on db', async () => {
        const user = await prisma.user.create({ data: userFake })

        await prisma.transaction.createMany({
            data: [
                {
                    amount: 5000,
                    type: 'EARNING',
                    user_id: user.id,
                    name: 'teste',
                    date: new Date(from),
                },
                {
                    amount: 5000,
                    type: 'EARNING',
                    user_id: user.id,
                    name: 'teste',
                    date: new Date(from),
                },
                {
                    amount: 1000,
                    type: 'EXPENSE',
                    user_id: user.id,
                    name: 'teste',
                    date: new Date(from),
                },
                {
                    amount: 1000,
                    type: 'EXPENSE',
                    user_id: user.id,
                    name: 'teste',
                    date: new Date(to),
                },
                {
                    amount: 2000,
                    type: 'INVESTMENT',
                    user_id: user.id,
                    name: 'teste',
                    date: new Date(to),
                },
                {
                    amount: 2000,
                    type: 'INVESTMENT',
                    user_id: user.id,
                    name: 'teste',
                    date: new Date(to),
                },
            ],
        })

        const sut = new PostgresGetUserBalanceRepository()

        const result = await sut.execute(user.id, from, to)

        expect(result.earnings.toString()).toBe('10000')
        expect(result.expenses.toString()).toBe('2000')
        expect(result.investments.toString()).toBe('4000')
        expect(result.balance.toString()).toBe('4000')
    })

    it('should call prisma with correct params', async () => {
        const sut = new PostgresGetUserBalanceRepository()
        const prismaSpy = import.meta.jest.spyOn(
            prisma.transaction,
            'aggregate',
        )

        await sut.execute(userFake.id, from, to)

        expect(prismaSpy).toHaveBeenCalledTimes(3)
        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                user_id: userFake.id,
                type: 'EARNING',
                date: {
                    gte: new Date(from),
                    lte: new Date(to),
                },
            },
            _sum: {
                amount: true,
            },
        })
        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                user_id: userFake.id,
                type: 'EXPENSE',
                date: {
                    gte: new Date(from),
                    lte: new Date(to),
                },
            },
            _sum: {
                amount: true,
            },
        })
        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                user_id: userFake.id,
                type: 'INVESTMENT',
                date: {
                    gte: new Date(from),
                    lte: new Date(to),
                },
            },
            _sum: {
                amount: true,
            },
        })
    })

    it('should throw if Prisma throws', async () => {
        const sut = new PostgresGetUserBalanceRepository()
        import.meta.jest
            .spyOn(prisma.transaction, 'aggregate')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute(userFake.id)

        await expect(promise).rejects.toThrow()
    })
})
