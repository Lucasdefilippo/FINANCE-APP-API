import { prisma } from '../../../../prisma/prisma.js'

export class PostgresCreateUserRepository {
    async execute(createUserParams) {
        const result = await prisma.user.create({
            data: {
                id: createUserParams.iD,
                first_name: createUserParams.first_name,
                last_name: createUserParams.last_name,
                email: createUserParams.email,
                password: createUserParams.password,
            },
        })
        return result
    }
}
