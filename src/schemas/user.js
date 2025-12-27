import { z } from 'zod'

export const createUserSchema = z.object({
    first_name: z.string().trim().min(1, {
        message: 'First Name is required',
    }),
    last_name: z.string().trim().min(1, {
        message: 'Last Name is required',
    }),
    email: z
        .email({
            message: 'Invalid E-mail. Please provide a valid one',
        })
        .trim()
        .min(1, {
            message: 'email is required',
        }),
    password: z.string().trim().min(6, {
        message: 'The password must be at least 6 characters',
    }),
})

export const updateUserSchema = createUserSchema.partial().strict()
