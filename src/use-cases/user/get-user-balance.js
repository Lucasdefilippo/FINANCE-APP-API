import { UserNotFoundError } from '../../errors/user.js'

export class GetUserBalanceUseCase {
    constructor(getUserBalanceRepository, getUserByIdRespoitory) {
        this.getUserBalanceRepository = getUserBalanceRepository
        this.getUserByIdRespoitory = getUserByIdRespoitory
    }
    async execute(userId, from, to) {
        const user = await this.getUserByIdRespoitory.execute(userId)

        if (!user) {
            throw new UserNotFoundError(userId)
        }

        const result = await this.getUserBalanceRepository.execute(
            userId,
            from,
            to,
        )

        return result
    }
}
