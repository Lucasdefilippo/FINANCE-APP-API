import request from 'supertest'
import { app } from '../../app'
import { transaction, user } from '../index.js'
import { prisma } from '../../../prisma/prisma'

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
})
