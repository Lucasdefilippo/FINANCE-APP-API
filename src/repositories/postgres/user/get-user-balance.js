import { postgresHelper } from '../../../db/postgres/helper.js'

export class PostgresGetUserBalanceRepository {
    async execute(userId) {
        const result = await postgresHelper.query(
            `SELECT * FROM get_user_balance($1)`,
            [userId],
        )
        return { userId, ...result.rows[0] }
    }
}
