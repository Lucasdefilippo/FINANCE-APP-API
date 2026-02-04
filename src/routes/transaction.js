import { Router } from 'express'
import {
    makeCreateTransactionController,
    makeDeleteTransactionController,
    makeGetTransactionsByUserIdController,
    makeUpdateTransactionsController,
} from '../factories/controllers/transaction.js'
import { auth } from '../middlewares/auth.js'

export const transactionsRoute = Router()

transactionsRoute.get('/', auth, async (request, response) => {
    const getTransactionsByUserId = makeGetTransactionsByUserIdController()

    const { statusCode, body } = await getTransactionsByUserId.execute({
        ...request,
        query: { userId: request.userId },
    })

    response.status(statusCode).send(body)
})

transactionsRoute.post('/', auth, async (request, response) => {
    const createTransactionController = makeCreateTransactionController()
    const { statusCode, body } = await createTransactionController.execute({
        ...request,
        body: {
            ...request.body,
            user_id: request.userId,
        },
    })

    response.status(statusCode).send(body)
})

transactionsRoute.patch('/:transactionId', auth, async (request, response) => {
    const updateTransactionController = makeUpdateTransactionsController()

    const { statusCode, body } = await updateTransactionController.execute({
        ...request,
        body: {
            ...request.body,
            user_id: request.userId,
        },
    })

    response.status(statusCode).send(body)
})

transactionsRoute.delete('/:transactionId', auth, async (request, response) => {
    const deleteTransactionController = makeDeleteTransactionController()

    const { statusCode, body } = await deleteTransactionController.execute({
        ...request,
        body: {
            ...request.body,
            user_id: request.userId,
        },
    })

    response.status(statusCode).send(body)
})
