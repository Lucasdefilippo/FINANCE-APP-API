import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'
import { prisma } from '../../../../prisma/prisma.js'
import { TransactionNotFoundError } from '../../../errors/transaction.js'

export class PostgresUpdateTransactionRepository {
    async execute(transactionId, transactionUpdateParams) {
        try {
            return await prisma.transaction.update({
                where: {
                    id: transactionId,
                },
                data: transactionUpdateParams,
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
