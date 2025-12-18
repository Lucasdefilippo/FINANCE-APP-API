import { postgresHelper } from '../../../db/postgres/helper.js'

export class PostgresCreateTransactionRepository {
    async execute(createTransactionParams) {
        const result = await postgresHelper.query(
            'INSERT INTO transactions (id, user_id, name, amount, transaction_date, TRANSACTION_TYPE) VALUES ($1, $2, $3, $4, $5, $6)',
            [
                createTransactionParams.id,
                createTransactionParams.user_id,
                createTransactionParams.name,
                createTransactionParams.amount,
                createTransactionParams.transaction_date,
                createTransactionParams.TRANSACTION_TYPE,
            ],
        )
        return result
    }
}
