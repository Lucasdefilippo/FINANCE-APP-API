import { Router } from 'express'
import {
    makeCreateTransactionController,
    makeDeleteTransactionController,
    makeGetTransactionsByUserIdController,
    makeUpdateTransactionsController,
} from '../factories/controllers/transaction.js'
import { auth } from '../middlewares/auth.js'

export const transactionsRoute = Router()

transactionsRoute.get('/me', auth, async (request, response) => {
    const getTransactionsByUserId = makeGetTransactionsByUserIdController()

    const { statusCode, body } = await getTransactionsByUserId.execute({
        ...request,
        body: {
            ...request.body,
            userId: request.userId,
        },
        query: {
            ...request.query,
            from: request.query.from,
            to: request.query.to,
        },
    })

    response.status(statusCode).send(body)
})

transactionsRoute.post('/me', auth, async (request, response) => {
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

transactionsRoute.patch(
    '/me/:transactionId',
    auth,
    async (request, response) => {
        const updateTransactionController = makeUpdateTransactionsController()

        const { statusCode, body } = await updateTransactionController.execute({
            ...request,
            body: {
                ...request.body,
                user_id: request.userId,
            },
        })

        response.status(statusCode).send(body)
    },
)

transactionsRoute.delete(
    '/me/:transactionId',
    auth,
    async (request, response) => {
        const deleteTransactionController = makeDeleteTransactionController()

        const { statusCode, body } = await deleteTransactionController.execute({
            ...request,
            body: {
                ...request.body,
                user_id: request.userId,
            },
        })

        response.status(statusCode).send(body)
    },
)
