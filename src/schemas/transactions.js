import z from 'zod'
import validator from 'validator'

export const createTransactionsSchema = z.object({
    user_id: z.uuid({ error: 'The provided ID is not valid' }),
    name: z.string().trim().min(1, {
        message: 'Name is required',
    }),
    date: z.iso.datetime(),
    type: z.enum(['EXPENSE', 'INVESTMENT', 'EARNING'], {
        error: 'The type must be EARNING, EXPENSE, INVESTMENT.',
    }),
    amount: z
        .number({
            error: 'Amount must be a number.',
        })
        .min(1, {
            message: 'Amount must be greater than 0',
        })
        .refine((amount) =>
            validator.isCurrency(amount.toFixed(2), {
                digits_after_decimal: [2],
                allow_negatives: false,
                decimal_separator: '.',
            }),
        ),
})

export const updateTransactionSchema = createTransactionsSchema
    .omit({user_id: true})
    .partial()
    .strict()
