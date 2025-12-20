import { UserNotFoundError } from '../../errors/user.js'

export class UpdateTransactionUseCase {
    constructor(updateTransactionRepository, getUserByIdRepository) {
        this.updateTransactionRepository = updateTransactionRepository
        this.getUserByIdRepository = getUserByIdRepository
    }
    async execute(params) {
        const validUser = await this.getUserByIdRepository.execute(
            params.userId,
        )

        if (!validUser) {
            throw new UserNotFoundError(params.userId)
        }

        const result = await this.updateTransactionRepository.execute(params)

        return result
    }
}
