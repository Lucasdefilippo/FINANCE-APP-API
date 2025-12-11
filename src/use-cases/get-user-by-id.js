import { PostgresGetUserByIdRepository } from '../repositories/postgres/get-user-by-id.js'

export class GetUserByIdUseCase {
    async execute(userID) {
        const getUserByIdRepoitory = new PostgresGetUserByIdRepository()

        const user = await getUserByIdRepoitory.execute(userID)

        return user
    }
}
