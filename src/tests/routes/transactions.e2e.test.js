import request from 'supertest'
import { app } from '../../app'
import { transaction, user } from '../index.js'
import { prisma } from '../../../prisma/prisma'
import { faker } from '@faker-js/faker'

describe('Transactions Routes E2E test', () => {
    it('POST /api/transaction should returns 201 when create a transaction', async () => {
        await prisma.user.create({ data: user })
        const response = await request(app)
            .post('/api/transaction')
            .send({
                ...transaction,
                user_id: user.id,
                id: undefined,
            })

        expect(response.status).toBe(201)
    })

    it('GET /api/transaction should returns 200 when fetching transactions successfully', async () => {
        await prisma.user.create({ data: user })
        const { body: createdtransaction } = await request(app)
            .post(`/api/transaction`)
            .send({
                ...transaction,
                user_id: user.id,
                id: undefined,
            })

        const response = await request(app).get(
            `/api/transaction?userId=${createdtransaction.user_id}`,
        )

        expect(response.status).toBe(200)
        expect(response.body[0].id).toBe(createdtransaction.id)
    })

    it('PATCH /api/transaction/:transactionId should return 200 when updating a transaction with successfully', async () => {
        await prisma.user.create({ data: user })
        const { body: createdtransaction } = await request(app)
            .post(`/api/transaction`)
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
            .patch(`/api/transaction/${createdtransaction.id}`)
            .send(updateTransactionParams)

        expect(response.status).toBe(200)
        expect(response.body.name).toBe(updateTransactionParams.name)
        expect(response.body.amount).toBe(
            String(updateTransactionParams.amount),
        )
    })
})
