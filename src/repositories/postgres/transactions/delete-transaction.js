import { prisma } from '../../../../prisma/prisma.js'

export class PostgresDeleteTransanctionRepository {
    async execute(transactionId) {
        try {
            return await prisma.transaction.delete({
                where: {
                    id: transactionId,
                },
            })
        } catch {
            return null
        }
    }
}
