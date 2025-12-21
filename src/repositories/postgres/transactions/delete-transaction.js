import { postgresHelper } from '../../../db/postgres/helper.js'

export class PostgresDeleteTransanctionRepository {
    async execute(transactionId) {
        const result = await postgresHelper.query(
            'DELETE FROM transactions WHERE id = $1 RETURNING *',
            [transactionId],
        )

        return result.rows[0]
    }
}
