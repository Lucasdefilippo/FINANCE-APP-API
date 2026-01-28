import dayjs from 'dayjs'
import { prisma } from '../../../../prisma/prisma'
import { PostgresGetTransactionsByUserIdRepository } from '../../../repositories/postgres/transactions/get-transaction-by-userId'
import { transaction, user } from '../../index.js'

describe('Get Transactions By User Id Repository', () => {
    it('should get transactions by user id on db', async () => {
        await prisma.user.create({ data: user })
        await prisma.transaction.create({
            data: { ...transaction, user_id: user.id },
        })
        const sut = new PostgresGetTransactionsByUserIdRepository()

        const result = await sut.execute(user.id)

        expect(result[0].name).toBe(transaction.name)
        expect(result[0].user_id).toBe(user.id)
        expect(result[0].type).toBe(transaction.type)
        expect(String(result[0].amount)).toBe(String(transaction.amount))
        expect(dayjs(result[0].date).daysInMonth()).toBe(
            dayjs(transaction.date).daysInMonth(),
        )
        expect(dayjs(result[0].date).month()).toBe(
            dayjs(transaction.date).month(),
        )
        expect(dayjs(result[0].date).year()).toBe(
            dayjs(transaction.date).year(),
        )
    })

    it('should call Prisma with correct params', async () => {
        const sut = new PostgresGetTransactionsByUserIdRepository()
        const prismaSpy = import.meta.jest.spyOn(prisma.transaction, 'findMany')

        await sut.execute(user.id)

        expect(prismaSpy).toHaveBeenCalledWith({
            where: { user_id: user.id },
        })
    })

    it('should throw if Prisma throws', async () => {
        const sut = new PostgresGetTransactionsByUserIdRepository()
        import.meta.jest
            .spyOn(prisma.transaction, 'findMany')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute(user.id)

        await expect(promise).rejects.toThrow()
    })
})
