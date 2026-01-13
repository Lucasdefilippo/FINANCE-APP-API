import { UserNotFoundError } from '../../errors/user.js'

export class GetUserBalanceUseCase {
    constructor(getUserBalanceRepository, getUserByIdRespoitory) {
        this.getUserBalanceRepository = getUserBalanceRepository
        this.getUserByIdRespoitory = getUserByIdRespoitory
    }
    async execute(userId) {
        const user = await this.getUserByIdRespoitory.execute(userId)

        if (!user) {
            throw new UserNotFoundError(userId)
        }

        const result = await this.getUserBalanceRepository.execute(userId)

        return result
    }
}
