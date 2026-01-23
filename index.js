import 'dotenv/config.js'
import express from 'express'

import {
    makeCreateTransactionController,
    makeDeleteTransactionController,
    makeGetTransactionsByUserIdController,
    makeUpdateTransactionsController,
} from './src/factories/controllers/transaction.js'
import { usersRoute } from './src/Routers/user.js'

const app = express()

app.use(express.json())

app.use('/api/users', usersRoute)

app.get('/api/transaction', async (request, response) => {
    const getTransactionsByUserId = makeGetTransactionsByUserIdController()

    const { statusCode, body } = await getTransactionsByUserId.execute(request)

    response.status(statusCode).send(body)
})

app.post('/api/transaction', async (request, response) => {
    const createTransactionController = makeCreateTransactionController()

    const { statusCode, body } =
        await createTransactionController.execute(request)

    response.status(statusCode).send(body)
})

app.patch('/api/transaction/:transactionId', async (request, response) => {
    const updateTransactionController = makeUpdateTransactionsController()

    const { statusCode, body } =
        await updateTransactionController.execute(request)

    response.status(statusCode).send(body)
})

app.delete('/api/transaction/:transactionId', async (request, response) => {
    const deleteTransactionController = makeDeleteTransactionController()

    const { statusCode, body } =
        await deleteTransactionController.execute(request)

    response.status(statusCode).send(body)
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
