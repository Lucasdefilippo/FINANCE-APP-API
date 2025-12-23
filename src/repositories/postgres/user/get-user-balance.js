import { postgresHelper } from '../../../db/postgres/helper.js'

export class PostgresGetUserBalanceRepository {
    async execute(userId) {
        const result = await postgresHelper.query(
            `
                    SELECT 
                        SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END) AS earning, 
                        SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) AS expense, 
                        SUM(CASE WHEN type = 'INVESTMENT' THEN amount ELSE 0 END) AS investment,
                        SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END)
                        - SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END)
                        - SUM(CASE WHEN type = 'INVESTMENT' THEN amount ELSE 0 END) AS balance
                    FROM transactions 
                    WHERE user_id = $1
                `,
            [userId],
        )
        return { userId, ...result.rows[0] }
    }
}
