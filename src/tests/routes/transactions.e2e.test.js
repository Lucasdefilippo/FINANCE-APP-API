import request from 'supertest'
import { app } from '../../app'
import { transaction, user } from '../index.js'
import { prisma } from '../../../prisma/prisma'
import { faker } from '@faker-js/faker'

describe('Transactions Routes E2E test', () => {
    it('POST /api/transactions should returns 201 when create a transaction', async () => {
        await prisma.user.create({ data: user })
        const response = await request(app)
            .post('/api/transactions')
            .send({
                ...transaction,
                user_id: user.id,
                id: undefined,
            })

        expect(response.status).toBe(201)
    })

    it('GET /api/transactions should returns 200 when fetching transactions successfully', async () => {
        await prisma.user.create({ data: user })
        const { body: createdTransaction } = await request(app)
            .post(`/api/transactions`)
            .send({
                ...transaction,
                user_id: user.id,
                id: undefined,
            })

        const response = await request(app).get(
            `/api/transactions?userId=${createdTransaction.user_id}`,
        )

        expect(response.status).toBe(200)
        expect(response.body[0].id).toBe(createdTransaction.id)
    })

    it('PATCH /api/transactions/:transactionId should return 200 when updating a transaction with successfully', async () => {
        await prisma.user.create({ data: user })
        const { body: createdTransaction } = await request(app)
            .post(`/api/transactions`)
            .send({
                ...transaction,
                user_id: user.id,
                id: undefined,
            })

        const updateTransactionParams = {
            name: faker.finance.currencyName(),
            date: faker.date.anytime().toISOString(),
            amount: 2000,
            type: 'EARNING',
        }

        const response = await request(app)
            .patch(`/api/transactions/${createdTransaction.id}`)
            .send(updateTransactionParams)

        expect(response.status).toBe(200)
        expect(response.body.name).toBe(updateTransactionParams.name)
        expect(response.body.amount).toBe(
            String(updateTransactionParams.amount),
        )
    })

    it('DELETE /api/transactions/:transactionId should return 200 when deleting a transaction with successfully', async () => {
        await prisma.user.create({ data: user })
        await prisma.transaction.create({
            data: { ...transaction, user_id: user.id },
        })
        const response = await request(app).delete(
            `/api/transactions/${transaction.id}`,
        )

        expect(response.status).toBe(200)
    })

    it('PATCH /api/transactions/:transactionId should return 404 when updating transactionId not exist', async () => {
        const response = await request(app)
            .patch(`/api/transactions/${faker.string.uuid()}`)
            .send({ name: faker.commerce.productName() })

        expect(response.status).toBe(404)
    })

    it('DELETE /api/transactions/:transactionId should return 404 when deleting transactionId not exist', async () => {
        const response = await request(app).delete(
            `/api/transactions/${faker.string.uuid()}`,
        )

        expect(response.status).toBe(404)
    })
})
