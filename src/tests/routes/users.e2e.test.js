import request from 'supertest'
import { app } from '../../app.js'

import { user } from '../index.js'
import { faker } from '@faker-js/faker'

describe('Users Routes E2E Tests', () => {
    const from = '2026-01-01'
    const to = '2026-02-01'

    it('POST /api/users should return 201 when a user is created', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({ ...user, id: undefined })

        expect(response.status).toBe(201)
    })
    it('POST /login should return 200 when user is authorized', async () => {
        const { body: createdUser } = await request(app)
            .post('/api/users')
            .send({ ...user, id: undefined })

        const response = await request(app).post('/api/users/login').send({
            email: createdUser.email,
            password: user.password,
        })

        expect(response.status).toBe(200)
        expect(response.body.tokens.accessToken).toBeDefined()
        expect(response.body.tokens.refreshToken).toBeDefined()
    })

    it('GET /api/users should return 200 when a user is found', async () => {
        const { body: createdUser } = await request(app)
            .post('/api/users')
            .send({ ...user, id: undefined })

        const response = await request(app)
            .get(`/api/users`)
            .set('Authorization', `Bearer ${createdUser.tokens.accessToken}`)

        expect(response.status).toBe(200)
        expect(response.body.id).toBe(createdUser.id)
    })

    it('PATCH /api/users should return 200 when a user is updated', async () => {
        const { body: createdUser } = await request(app)
            .post('/api/users')
            .send({ ...user, id: undefined })

        const updateUserParams = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 7 }),
        }

        const response = await request(app)
            .patch(`/api/users`)
            .set('Authorization', `Bearer ${createdUser.tokens.accessToken}`)
            .send(updateUserParams)

        expect(response.status).toBe(200)
        expect(response.body.first_name).toBe(updateUserParams.first_name)
        expect(response.body.last_name).toBe(updateUserParams.last_name)
        expect(response.body.email).toBe(updateUserParams.email)
        expect(response.body.password).not.toBe(createdUser.password)
    })

    it('Delete /api/users should return 200 when a user is deleted', async () => {
        const { body: createdUser } = await request(app)
            .post('/api/users')
            .send({ ...user, id: undefined })

        const response = await request(app)
            .delete(`/api/users`)
            .set('Authorization', `Bearer ${createdUser.tokens.accessToken}`)

        expect(response.status).toBe(200)
        expect(response.body.id).toBe(createdUser.id)
    })

    it('GET /api/users/balance should return 200 and correct balance', async () => {
        const { body: createdUser } = await request(app)
            .post('/api/users')
            .send({ ...user, id: undefined })

        await request(app)
            .post('/api/transactions')
            .set('Authorization', `Bearer ${createdUser.tokens.accessToken}`)
            .send({
                name: faker.finance.currencyName(),
                date: new Date(from),
                amount: 10000,
                type: 'EARNING',
            })

        await request(app)
            .post('/api/transactions')
            .set('Authorization', `Bearer ${createdUser.tokens.accessToken}`)
            .send({
                name: faker.finance.currencyName(),
                date: new Date(from),
                amount: 2000,
                type: 'EXPENSE',
            })

        await request(app)
            .post('/api/transactions')
            .set('Authorization', `Bearer ${createdUser.tokens.accessToken}`)
            .send({
                name: faker.finance.currencyName(),
                date: new Date(to),
                amount: 3000,
                type: 'INVESTMENT',
            })

        const response = await request(app)
            .get(`/api/users/balance?from=${from}&to=${to}`)
            .set('Authorization', `Bearer ${createdUser.tokens.accessToken}`)

        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            earnings: '10000',
            expenses: '2000',
            investments: '3000',
            earningsPercentage: '66',
            expensesPercentage: '13',
            investmentsPercentage: '20',
            balance: '5000',
        })
    })

    it('POST /api/users should return 400 when the provided e-mail is already in use', async () => {
        const { body: createdUser } = await request(app)
            .post('/api/users')
            .send({
                ...user,
                id: undefined,
            })

        const response = await request(app)
            .post('/api/users')
            .send({
                ...user,
                id: undefined,
                email: createdUser.email,
            })

        expect(response.status).toBe(400)
    })

    it('POST /api/users/refresh-token should return 200 and new tokens when refresh_token is valid', async () => {
        const { body: createdUser } = await request(app)
            .post('/api/users')
            .send({
                ...user,
                id: undefined,
            })

        const response = await request(app)
            .post('/api/users/refresh-token')
            .send({ refreshToken: createdUser.tokens.refreshToken })

        expect(response.status).toBe(200)
    })

    it('POST /api/user/refresh-token return 401 if unauthorized', async () => {
        const response = await request(app)
            .post('/api/users/refresh-token')
            .send({ refreshToken: 'invalid_refresh_token' })

        expect(response.statusCode).toBe(401)
    })
})
