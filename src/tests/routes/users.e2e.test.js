import request from 'supertest'
import { app } from '../../app.js'

import { user } from '../index.js'
import { faker } from '@faker-js/faker'

describe('Users Routes E2E Tests', () => {
    it('POST /api/users should return 201 when a user is created', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({ ...user, id: undefined })

        expect(response.status).toBe(201)
    })

    it('GET /api/users/:id should return 200 when a user is found', async () => {
        const { body: createdUser } = await request(app)
            .post('/api/users')
            .send({ ...user, id: undefined })

        const response = await request(app).get(`/api/users/${createdUser.id}`)

        expect(response.status).toBe(200)
        expect(response.body).toEqual(createdUser)
    })

    it('PATCH /api/users/:id should return 200 when a user is updated', async () => {
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
            .patch(`/api/users/${createdUser.id}`)
            .send(updateUserParams)

        expect(response.status).toBe(200)
        expect(response.body.first_name).toBe(updateUserParams.first_name)
        expect(response.body.last_name).toBe(updateUserParams.last_name)
        expect(response.body.email).toBe(updateUserParams.email)
        expect(response.body.password).not.toBe(createdUser.password)
    })

    it('Delete /api/users/:id should return 200 when a user is deleted', async () => {
        const { body: createdUser } = await request(app)
            .post('/api/users')
            .send({ ...user, id: undefined })

        const response = await request(app).delete(
            `/api/users/${createdUser.id}`,
        )

        expect(response.status).toBe(200)
        expect(response.body).toEqual(createdUser)
    })

    it('GET /api/users/:id/balance should return 200 and correct balance', async () => {
        const { body: createdUser } = await request(app)
            .post('/api/users')
            .send({ ...user, id: undefined })

        await request(app).post('/api/transaction').send({
            user_id: createdUser.id,
            name: faker.finance.currencyName(),
            date: faker.date.anytime().toISOString(),
            amount: 10000,
            type: 'EARNING',
        })

        await request(app).post('/api/transaction').send({
            user_id: createdUser.id,
            name: faker.finance.currencyName(),
            date: faker.date.anytime().toISOString(),
            amount: 2000,
            type: 'EXPENSE',
        })

        await request(app).post('/api/transaction').send({
            user_id: createdUser.id,
            name: faker.finance.currencyName(),
            date: faker.date.anytime().toISOString(),
            amount: 3000,
            type: 'INVESTMENT',
        })

        const response = await request(app).get(
            `/api/users/${createdUser.id}/balance`,
        )

        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            earnings: '10000',
            expenses: '2000',
            investments: '3000',
            balance: '5000',
        })
    })

    it('GET /api/users/:id should returns 404 when user is not found', async () => {
        const response = await request(app).get(
            `/api/users/${faker.string.uuid()}`,
        )

        expect(response.status).toBe(404)
    })

    it('GET /api/users/:id/balance should returns 404 when user is not found', async () => {
        const response = await request(app).get(
            `/api/users/${faker.string.uuid()}`,
        )

        expect(response.status).toBe(404)
    })

    it('PATCH /api/users/:id should returns 404 when user is not found', async () => {
        const updateUserParams = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 7 }),
        }

        const response = await request(app)
            .patch(`/api/users/${faker.string.uuid()}`)
            .send(updateUserParams)

        expect(response.status).toBe(404)
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
})
