import { postgresHelper } from '../../../db/postgres/helper.js'

export class PostgresGetUserBalanceRepository {
    async execute(userId) {
        const result = postgresHelper.query(
            `
                SELECT 
                    SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END) AS EARNING, 
                    SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) AS EXPENSE, 
                    SUM(CASE WHEN type = 'INVESTMENT' THEN amount ELSE 0 END) AS INVESTMENT,
                    SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END - 
                    CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END - 
                    CASE WHEN type = 'INVESTMENT' THEN amount ELSE 0 END
                    ) AS BALANCE, 
                FROM transactions 
                WHERE user_id = '$1'
            `,
            [userId],
        )
        return {
            userId,
            ...result.rows[0],
        }
    }
}
