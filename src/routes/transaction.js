import { Router } from 'express'
import {
    makeCreateTransactionController,
    makeDeleteTransactionController,
    makeGetTransactionsByUserIdController,
    makeUpdateTransactionsController,
} from '../factories/controllers/transaction.js'

export const transactionsRoute = Router()

transactionsRoute.get('/', async (request, response) => {
    const getTransactionsByUserId = makeGetTransactionsByUserIdController()

    const { statusCode, body } = await getTransactionsByUserId.execute(request)

    response.status(statusCode).send(body)
})

transactionsRoute.post('/', async (request, response) => {
    const createTransactionController = makeCreateTransactionController()

    const { statusCode, body } =
        await createTransactionController.execute(request)

    response.status(statusCode).send(body)
})

transactionsRoute.patch('/:transactionId', async (request, response) => {
    const updateTransactionController = makeUpdateTransactionsController()

    const { statusCode, body } =
        await updateTransactionController.execute(request)

    response.status(statusCode).send(body)
})

transactionsRoute.delete('/:transactionId', async (request, response) => {
    const deleteTransactionController = makeDeleteTransactionController()

    const { statusCode, body } =
        await deleteTransactionController.execute(request)

    response.status(statusCode).send(body)
})
