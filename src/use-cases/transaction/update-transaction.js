export class UpdateTransactionUseCase {
    constructor(updateTransactionRepository) {
        this.updateTransactionRepository = updateTransactionRepository
    }
    async execute(transactionId, params) {
        const result = await this.updateTransactionRepository.execute(
            transactionId,
            params,
        )

        return result
    }
}
