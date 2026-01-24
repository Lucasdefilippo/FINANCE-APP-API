import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'
import { prisma } from '../../../../prisma/prisma.js'
import { UserNotFoundError } from '../../../errors/user.js'

export class PostgresUpdateUser {
    async execute(userId, userUpdateParams) {
        try {
            return await prisma.user.update({
                where: {
                    id: userId,
                },
                data: userUpdateParams,
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                const code = error.code

                if (code === 'P2025') {
                    throw new UserNotFoundError(userId)
                }
            }

            throw error
        }
    }
}
