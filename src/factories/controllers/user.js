import {
    GetUserByIdController,
    CreateUserController,
    UpdateUserController,
    DeleteUserController,
} from '../../controllers/index.js'
import {
    GetUserByIdUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
} from '../../use-cases/index.js'
import {
    PostgresGetUserByIdRepository,
    PostgresCreateUserRepository,
    PostgresGetUserByEmailRepository,
    PostgresUpdateUser,
    PostgresDeleteUserRepository,
} from '../../repositories/postgres/index.js'

export const makeGetUserByIdController = () => {
    const getUserByIdRepoitory = new PostgresGetUserByIdRepository()
    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepoitory)
    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

    return getUserByIdController
}

export const makeCreateUserController = () => {
    const createUserRepository = new PostgresCreateUserRepository()
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
    const createUserUseCase = new CreateUserUseCase(
        createUserRepository,
        getUserByEmailRepository,
    )
    const createUserController = new CreateUserController(createUserUseCase)

    return createUserController
}

export const makeUpdateUserController = () => {
    const updateUserRepository = new PostgresUpdateUser()
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
    const updateUserUseCase = new UpdateUserUseCase(
        updateUserRepository,
        getUserByEmailRepository,
    )
    const updateUserController = new UpdateUserController(updateUserUseCase)

    return updateUserController
}

export const makeDeleteUserController = () => {
    const deleteUserRepository = new PostgresDeleteUserRepository()
    const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository)
    const deleteUserController = new DeleteUserController(deleteUserUseCase)

    return deleteUserController
}
