import { prisma } from '../../../../prisma/prisma.js'
// import { postgresHelper } from '../../../db/postgres/helper.js'

export class PostgresGetUserByEmailRepository {
    async execute(email) {
        return await prisma.user.findUnique({
            where: {
                email,
            },
        })
    }
}
