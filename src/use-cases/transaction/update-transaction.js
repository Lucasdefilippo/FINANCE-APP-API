export class UpdateTransactionUseCase {
    constructor(updateTransactionRepository) {
        this.updateTransactionRepository = updateTransactionRepository
    }
    async execute(transactonId, params) {
        const result = await this.updateTransactionRepository.execute(
            transactonId,
            params,
        )

        return result
    }
}
