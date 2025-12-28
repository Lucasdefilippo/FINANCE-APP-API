import { prisma } from '../../../../prisma/prisma.js'

export class PostgresUpdateUser {
    async execute(userId, userUpdateParams) {
        return await prisma.user.update({
            where: {
                id: userId,
            },
            data: userUpdateParams,
        })
    }
}
