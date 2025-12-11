import { postgresHelper } from '../../db/postgres/helper.js'

export class PostgresGetUserByIdRepository {
    async execute(userID) {
        const user = await postgresHelper.query(
            'SELECT * FROM users WHERE ID = $1',
            [userID],
        )

        return user
    }
}
