import express from 'express'

import { usersRoute } from './routes/user.js'
import { transactionsRoute } from './routes/transaction.js'

export const app = express()

app.use(express.json())

app.use('/api/users', usersRoute)

app.use('/api/transaction', transactionsRoute)
