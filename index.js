import 'dotenv/config.js'
import express from 'express'

import { usersRoute } from './src/routes/user.js'
import { transactionsRoute } from './src/routes/transaction.js'

export const app = express()

app.use(express.json())

app.use('/api/users', usersRoute)

app.use('/api/transaction', transactionsRoute)

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
