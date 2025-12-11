export class PostgresGetUserByEmail {
    async execute(email) {
        const user = await postgresHelper.query(
            'SELECT * FROM users WHERE email = $1',
            [email],
        )

        return user
    }
}
