import { postgresHelper } from '../../../db/postgres/helper.js'

export class PostgresCreateTransactionRepository {
    async execute(createTransactionParams) {
        const result = await postgresHelper.query(
            'INSERT INTO transactions (id, user_id, name, amount, date, type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [
                createTransactionParams.id,
                createTransactionParams.user_id,
                createTransactionParams.name,
                createTransactionParams.amount,
                createTransactionParams.date,
                createTransactionParams.type,
            ],
        )
        return result.rows[0]
    }
}
