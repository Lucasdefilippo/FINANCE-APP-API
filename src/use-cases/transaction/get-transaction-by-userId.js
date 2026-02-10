import { UserNotFoundError } from '../../errors/user.js'

export class GetTransactionsByUserIdUseCase {
    constructor(getTransactionsbyUserIdRepository, getUserByIdRepository) {
        this.getTransactionsbyUserIdRepository =
            getTransactionsbyUserIdRepository
        this.getUserByIdRepository = getUserByIdRepository
    }
    async execute(userId, from, to) {
        const userValidate = await this.getUserByIdRepository.execute(userId)

        if (!userValidate) {
            throw new UserNotFoundError(userId)
        }

        const result = await this.getTransactionsbyUserIdRepository.execute(
            userId,
            from,
            to,
        )

        return result
    }
}
