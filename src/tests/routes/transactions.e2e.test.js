import request from 'supertest'
import { app } from '../../app'
import { transaction, user } from '../index.js'
import { prisma } from '../../../prisma/prisma'
import { faker } from '@faker-js/faker'

describe('Transactions Routes E2E test', () => {
    const from = '2020-01-01'
    const to = '2020-01-02'
    it('POST /api/transactions should returns 201 when create a transaction', async () => {
        const { body: createdUser } = await request(app)
            .post('/api/users')
            .send({ ...user, id: undefined })

        const response = await request(app)
            .post('/api/transactions')
            .set('Authorization', `Bearer ${createdUser.tokens.accessToken}`)
            .send({
                ...transaction,
                user_id: user.id,
                id: undefined,
            })

        expect(response.status).toBe(201)
    })

    it('GET /api/transactions should returns 200 when fetching transactions successfully', async () => {
        const { body: createdUser } = await request(app)
            .post('/api/users')
            .send({ ...user, id: undefined })
        const { body: createdTransaction } = await request(app)
            .post(`/api/transactions`)
            .send({
                ...transaction,
                date: new Date(from),
                id: undefined,
            })
            .set('Authorization', `Bearer ${createdUser.tokens.accessToken}`)

        const response = await request(app)
            .get(`/api/transactions?from=${from}&to=${to}`)
            .set('Authorization', `Bearer ${createdUser.tokens.accessToken}`)

        expect(response.status).toBe(200)
        expect(response.body[0].id).toBe(createdTransaction.id)
    })

    it('PATCH /api/transactions/:transactionId should return 200 when updating a transaction with successfully', async () => {
        const { body: createdUser } = await request(app)
            .post('/api/users')
            .send({ ...user, id: undefined })

        const { body: createdTransaction } = await request(app)
            .post(`/api/transactions`)
            .send({
                ...transaction,
                id: undefined,
            })
            .set('Authorization', `Bearer ${createdUser.tokens.accessToken}`)

        const updateTransactionParams = {
            name: faker.finance.currencyName(),
            date: faker.date.anytime().toISOString(),
            amount: 2000,
            type: 'EARNING',
        }

        const response = await request(app)
            .patch(`/api/transactions/${createdTransaction.id}`)
            .set('Authorization', `Bearer ${createdUser.tokens.accessToken}`)
            .send(updateTransactionParams)

        expect(response.status).toBe(200)
        expect(response.body.name).toBe(updateTransactionParams.name)
        expect(response.body.amount).toBe(
            String(updateTransactionParams.amount),
        )
    })

    it('DELETE /api/transactions/:transactionId should return 200 when deleting a transaction with successfully', async () => {
        const { body: createdUser } = await request(app)
            .post('/api/users')
            .send({ ...user, id: undefined })
        await prisma.transaction.create({
            data: { ...transaction, user_id: createdUser.id },
        })

        const response = await request(app)
            .delete(`/api/transactions/${transaction.id}`)
            .set('Authorization', `Bearer ${createdUser.tokens.accessToken}`)

        expect(response.status).toBe(200)
    })

    it('DELETE /api/transactions/:transactionId should return 401 if userId is not equal userId from transaction', async () => {
        const { body: createdUser } = await request(app)
            .post('/api/users')
            .send({ ...user, id: undefined })

        const response = await request(app)
            .delete(`/api/transactions/${faker.string.uuid()}`)
            .set('Authorizatin', `Bearer ${createdUser.tokens.accessToken}`)

        expect(response.status).toBe(401)
    })
})
