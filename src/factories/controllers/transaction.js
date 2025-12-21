import {
    PostgresCreateTransactionRepository,
    PostgresDeleteTransanctionRepository,
    PostgresGetTransactionsByUserIdRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateTransactionRepository,
} from '../../repositories/postgres/index.js'
import {
    CreateTransactionUseCase,
    GetTransactionsByUserIdUseCase,
    UpdateTransactionUseCase,
    DeleteTransactionUseCase,
} from '../../use-cases/index.js'
import {
    CreateTransactionController,
    GetTransactionsByUserIdController,
    UpdateTransactionController,
    DeleteTransactionController,
} from '../../controllers/index.js'

export const makeCreateTransactionController = () => {
    const createTransactionRepository =
        new PostgresCreateTransactionRepository()

    const getUserByIdController = new PostgresGetUserByIdRepository()

    const createTransactionUseCase = new CreateTransactionUseCase(
        createTransactionRepository,
        getUserByIdController,
    )

    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase,
    )

    return createTransactionController
}

export const makeGetTransactionsByUserIdController = () => {
    const getTransactionsbyUserIdRepository =
        new PostgresGetTransactionsByUserIdRepository()

    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const getUserByUserIdUseCase = new GetTransactionsByUserIdUseCase(
        getTransactionsbyUserIdRepository,
        getUserByIdRepository,
    )

    const getUserByUserIdController = new GetTransactionsByUserIdController(
        getUserByUserIdUseCase,
    )

    return getUserByUserIdController
}

export const makeUpdateTransactionsController = () => {
    const updateTransactionRepository =
        new PostgresUpdateTransactionRepository()

    const updateTransactionUseCase = new UpdateTransactionUseCase(
        updateTransactionRepository,
    )

    const updateTransactionController = new UpdateTransactionController(
        updateTransactionUseCase,
    )

    return updateTransactionController
}

export const makeDeleteTransactionController = () => {
    const deleteTransactionRepository =
        new PostgresDeleteTransanctionRepository()

    const deleteTransactinUseCase = new DeleteTransactionUseCase(
        deleteTransactionRepository,
    )

    const deleteTransactionController = new DeleteTransactionController(
        deleteTransactinUseCase,
    )

    return deleteTransactionController
}
