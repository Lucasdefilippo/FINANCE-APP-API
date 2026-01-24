import request from 'supertest'
import { app } from '../../..'

import { user } from '../index.js'

describe('Users Routes E2E Tests', () => {
    it('POST /api/users should return 201 when a user is created', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({ ...user, id: undefined })

        expect(response.status).toBe(201)
    })
})
