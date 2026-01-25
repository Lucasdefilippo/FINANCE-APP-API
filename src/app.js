import express from 'express'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import path from 'path'

import { usersRoute } from './routes/user.js'
import { transactionsRoute } from './routes/transaction.js'

export const app = express()

app.use(express.json())

app.use('/api/users', usersRoute)

app.use('/api/transaction', transactionsRoute)

const swaggerDocument = JSON.parse(
    fs.readFileSync(
        path.join(import.meta.dirname, '../docs/swagger.json'),
        'utf8',
    ),
)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
