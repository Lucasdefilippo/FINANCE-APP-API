import pg from 'pg'

const { Pool } = pg

export const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
})

export const postgresHelper = {
    query: async (query, params) => {
        const client = await pool.connect()
        const result = await client.query(query, params)

        client.release()

        return result.rows[0]
    },
}
