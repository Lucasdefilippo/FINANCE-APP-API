import {
    CreateTransactionController,
    DeleteTransactionController,
    UpdateTransactionController,
} from '../../controllers/index.js'
import {
    makeCreateTransactionController,
    makeDeleteTransactionController,
    makeUpdateTransactionsController,
} from '../../factories/controllers/transaction.js'

describe('Transaction Controller Factories', () => {
    it('should return a valid CreateTransactionController instance', () => {
        expect(makeCreateTransactionController()).toBeInstanceOf(
            CreateTransactionController,
        )
    })

    it('should return a valid UpdateTransactionController instance', () => {
        expect(makeUpdateTransactionsController()).toBeInstanceOf(
            UpdateTransactionController,
        )
    })

    it('should return a valid DeleteTransactionController instance', () => {
        expect(makeDeleteTransactionController()).toBeInstanceOf(
            DeleteTransactionController,
        )
    })
})
