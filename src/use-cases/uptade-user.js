import { EmailAlreadyInUse } from '../errors/user.js'
import { PostgresGetUserByEmail } from '../repositories/postgres/get-user-by-email.js'
import bcrypt from 'bcrypt'
import { PostgresUpdateUser } from '../repositories/postgres/update-user.js'

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        // Verificar se email exite ou está em uso em caso de atualização do e-mail

        if (updateUserParams.email) {
            const postgresGetUserByEmail = new PostgresGetUserByEmail()

            const userWithProvideEmail = await postgresGetUserByEmail.execute(
                updateUserParams.email,
            )

            if (userWithProvideEmail && userWithProvideEmail.id !== userId) {
                throw new EmailAlreadyInUse()
            }
        }

        // Verificar e criptografar a senha

        const updateUser = {
            ...updateUserParams,
        }

        if (updateUserParams.password) {
            const hashedPassword = bcrypt.hashSync(
                updateUserParams.password,
                10,
            )

            updateUser.password = hashedPassword
        }

        // Chamar o repository

        const postgresUpdateUserRepository = new PostgresUpdateUser()
        const user = await postgresUpdateUserRepository.execute(
            userId,
            updateUser,
        )

        return user
    }
}
