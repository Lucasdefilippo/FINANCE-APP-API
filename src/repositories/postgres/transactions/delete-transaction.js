import { prisma } from '../../../../prisma/prisma.js'

export class PostgresDeleteTransanctionRepository {
    async execute(transactionId) {
        try {
            return await prisma.transaction.delete({
                where: {
                    id: transactionId,
                },
            })
        } catch (error) {
            if (error == PrismaClientKnownRequestError) {
                const code = error.code

                if (code === 'P2025') {
                    throw new TransactionNotFoundError(transactionId)
                }
            }

            throw error
        }
    }
}
