export class DeleteTransactionUseCase {
    constructor(deleteTransactionRepository) {
        this.deleteTransactionRepository = deleteTransactionRepository
    }

    async execute(transactionId) {
        const result =
            await this.deleteTransactionRepository.execute(transactionId)

        return result
    }
}
