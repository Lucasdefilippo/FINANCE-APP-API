import { UserNotFoundError } from '../../errors/user.js'

export class GetUserBalanceUseCase {
    constructor(getUserBalanceRepository, getUserByIdRespoitory) {
        this.getUserBalanceRepository = getUserBalanceRepository
        this.getUserByIdRespoitory = getUserByIdRespoitory
    }
    async execute(params) {
        const user = this.getUserByIdRespoitory.execute(params.userId)

        if (!user) {
            throw new UserNotFoundError(params.userId)
        }

        const result = this.getUserBalanceRepository.execute(params.userId)

        return result
    }
}
