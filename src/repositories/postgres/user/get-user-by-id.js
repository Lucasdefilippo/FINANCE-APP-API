import { prisma } from '../../../../prisma/prisma.js'

export class PostgresGetUserByIdRepository {
    async execute(userID) {
        return await prisma.user.findUnique({
            where: {
                id: userID,
            },
        })
    }
}
