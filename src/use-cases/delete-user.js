import { PostgresDeleteUserRepository } from '../repositories/postgres/delete-user.js'

export class DeleteUserUseCase {
    async execute(userID) {
        const deleteUserRepository = new PostgresDeleteUserRepository()

        const user = await deleteUserRepository.execute(userID)

        return user
    }
}
