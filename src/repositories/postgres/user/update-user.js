import { postgresHelper } from '../../../db/postgres/helper.js'

export class PostgresUpdateUser {
    async execute(userId, userUpdateParams) {
        const updateField = []
        const updateValues = []

        Object.keys(userUpdateParams).forEach((key) => {
            updateField.push(`${key} = $${updateField.length + 1}`)
            updateValues.push(userUpdateParams[key])
        })

        updateValues.push(`${userId}`)

        const updateQuery = `UPDATE users SET ${updateField} WHERE id = $${updateValues.length} RETURNING *`

        const updateUser = await postgresHelper.query(updateQuery, updateValues)

        return updateUser.rows[0]
    }
}
