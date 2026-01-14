import { EmailAlreadyInUse } from '../../errors/user.js'

export class UpdateUserUseCase {
    constructor(
        updateUserRepository,
        getUserByEmailRepository,
        passwordHasher,
    ) {
        this.updateUserRepository = updateUserRepository
        this.getUserByEmailRepository = getUserByEmailRepository
        this.passwordHasher = passwordHasher
    }
    async execute(userId, updateUserParams) {
        // Verificar se email exite ou está em uso em caso de atualização do e-mail

        if (updateUserParams.email) {
            const userWithProvideEmail =
                await this.getUserByEmailRepository.execute(
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
            const hashedPassword = await this.passwordHasher.execute(
                updateUserParams.password,
            )

            updateUser.password = hashedPassword
        }

        // Chamar o repository

        const user = await this.updateUserRepository.execute(userId, updateUser)

        return user
    }
}
