import { prisma } from '../../../../prisma/prisma'
import { PostgresDeleteTransanctionRepository } from '../../../repositories/postgres/transactions/delete-transaction'
import { transaction, user } from '../../index.js'
import { TransactionNotFoundError } from '../../../errors/transaction.js'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'

describe('PostgresDeleteTransactionRepository', () => {
    it('should delete a transaction on db', async () => {
        await prisma.user.create({ data: user })
        await prisma.transaction.create({
            data: { ...transaction, user_id: user.id },
        })
        const sut = new PostgresDeleteTransanctionRepository()

        const result = await sut.execute(transaction.id)

        expect(result.name).toBe(transaction.name)
        expect(result.user_id).toBe(user.id)
        expect(result.type).toBe(transaction.type)
        expect(String(result.amount)).toBe(String(transaction.amount))
        expect(result.date).toBeDefined()
    })

    it('should call Prisma with correct params', async () => {
        await prisma.user.create({ data: user })
        await prisma.transaction.create({
            data: { ...transaction, user_id: user.id },
        })
        const sut = new PostgresDeleteTransanctionRepository()
        const prismaSpy = jest.spyOn(prisma.transaction, 'delete')

        await sut.execute(transaction.id)

        expect(prismaSpy).toHaveBeenCalledWith({
            where: { id: transaction.id },
        })
    })

    it('should throw a new generic error if Prisma throws generic error', async () => {
        const sut = new PostgresDeleteTransanctionRepository()
        jest.spyOn(prisma.transaction, 'delete').mockRejectedValueOnce(
            new Error(),
        )

        const promise = sut.execute(transaction.id)

        await expect(promise).rejects.toThrow()
    })

    it('should throw TransactionNotFoundError if Prisma throws error code P2025', async () => {
        const sut = new PostgresDeleteTransanctionRepository()
        jest.spyOn(prisma.transaction, 'delete').mockRejectedValueOnce(
            new PrismaClientKnownRequestError('', { code: 'P2025' }),
        )

        const promise = sut.execute(transaction.id)

        await expect(promise).rejects.toThrow(
            new TransactionNotFoundError(transaction.id),
        )
    })
})
