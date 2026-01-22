import { PostgresUpdateTransactionRepository } from '../../../repositories/postgres/transactions/update-transaction'
import { prisma } from '../../../../prisma/prisma.js'
import { transaction, user } from '../../index.js'
import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'

describe('Update Transaction Repository', () => {
    it('should update transaction on db', async () => {
        await prisma.user.create({ data: user })
        const createdTransaction = await prisma.transaction.create({
            data: { ...transaction, user_id: user.id },
        })
        const sut = new PostgresUpdateTransactionRepository()

        const params = {
            id: faker.string.uuid(),
            user_id: user.id,
            name: faker.finance.currencyName(),
            date: faker.date.anytime().toISOString(),
            amount: Number(faker.finance.amount()),
            type: 'EARNING',
        }

        const result = await sut.execute(createdTransaction.id, params)

        expect(result.id).toBe(params.id)
        expect(result.user_id).toBe(params.user_id)
        expect(result.name).toBe(params.name)
        expect(dayjs(result.date).daysInMonth).toBe(
            dayjs(params.date).daysInMonth,
        )
        expect(dayjs(result.date).month).toBe(dayjs(params.date).month)
        expect(dayjs(result.date).year).toBe(dayjs(params.date).year)
        expect(String(result.amount)).toBe(String(params.amount))
        expect(result.type).toBe(params.type)
    })
})
