import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'
import { prisma } from '../../../../prisma/prisma.js'
import { TransactionNotFoundError } from '../../../errors/transaction.js'

export class PostgresDeleteTransanctionRepository {
    async execute(transactionId) {
        try {
            return await prisma.transaction.delete({
                where: {
                    id: transactionId,
                },
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                const code = error.code

                if (code === 'P2025') {
                    throw new TransactionNotFoundError(transactionId)
                }
            }

            throw error
        }
    }
}
