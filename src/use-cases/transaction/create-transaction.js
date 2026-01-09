import { UserNotFoundError } from '../../errors/user.js'

export class CreateTransactionUseCase {
    constructor(
        createTransactionRepository,
        getUserByIdRepository,
        idGenerator,
    ) {
        this.createTransactionRepository = createTransactionRepository
        this.getUserByIdRepository = getUserByIdRepository
        this.idGenerator = idGenerator
    }

    async execute(createTransactionParams) {
        const userId = createTransactionParams.user_id

        const user = await this.getUserByIdRepository.execute(userId)

        if (!user) {
            throw new UserNotFoundError(userId)
        }

        const transactionId = this.idGenerator.execute()

        const transaction = await this.createTransactionRepository.execute({
            ...createTransactionParams,
            id: transactionId,
        })

        return transaction
    }
}
