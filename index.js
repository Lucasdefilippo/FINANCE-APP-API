import 'dotenv/config.js'
import express from 'express'
import {
    makeCreateUserController,
    makeDeleteUserController,
    makeGetUserByIdController,
    makeUpdateUserController,
} from './src/factories/controllers/user.js'
import {
    makeCreateTransactionController,
    makeDeleteTransactionController,
    makeGetTransactionsByUserIdController,
    makeUpdateTransactionsController,
} from './src/factories/controllers/transaction.js'

const app = express()

app.use(express.json())

app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdController = makeGetUserByIdController()

    const { statusCode, body } = await getUserByIdController.execute(request)

    response.status(statusCode).send(body)
})

app.post('/api/users', async (request, response) => {
    const createUserController = makeCreateUserController()

    const { statusCode, body } = await createUserController.execute(request)

    response.status(statusCode).send(body)
})

app.patch('/api/users/:userId', async (request, response) => {
    const updateUserController = makeUpdateUserController()
    const { statusCode, body } = await updateUserController.execute(request)

    response.status(statusCode).send(body)
})

app.delete('/api/users/:userId', async (request, response) => {
    const deleteUserController = makeDeleteUserController()

    const { statusCode, body } = await deleteUserController.execute(request)

    response.status(statusCode).send(body)
})

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

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
