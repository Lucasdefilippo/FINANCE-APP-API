export class PostgresUpdateTransactionRepository {
    async execute(transactionId, transactionUpdateParams) {
        const updateField = []
        const updateValues = []

        Object.keys(transactionUpdateParams).forEach((key) => {
            updateField.push(`${key} = $${updateField.length + 1}`)
            updateValues.push(transactionUpdateParams[key])
        })

        updateValues.push(`${transactionId}`)

        const updateQuery = `UPDATE users SET ${updateField} WHERE id = $${updateValues.length} RETURNING *`

        const result = await postgresHelper.query(updateQuery, updateValues)

        return result.rows[0]
    }
}
