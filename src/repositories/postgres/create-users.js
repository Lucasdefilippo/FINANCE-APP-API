import { postgresHelper } from '../../db/postgres/helper'

export class PostgresCreateUsersRepository {
    async execute(createUsersParams) {
        const result = await postgresHelper.query(
            'INSERT INTO users (ID, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)',
            [
                createUsersParams.ID,
                createUsersParams.first_name,
                createUsersParams.last_name,
                createUsersParams.email,
                createUsersParams.password,
            ],
        )
        return result[0]
    }
}
