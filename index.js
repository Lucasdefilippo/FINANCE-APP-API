import 'dotenv/config.js'
import express from 'express'
import { postgresHelper } from './src/db/postgres/helper.js'

const app = express()

app.get('/', async (req, res) => {
    const result = await postgresHelper.query('SELECT * FROM users;')

    res.send(JSON.stringify(result))
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
