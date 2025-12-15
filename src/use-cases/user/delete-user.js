export class DeleteUserUseCase {
    constructor(deleteUserRepository) {
        this.deleteUserRepository = deleteUserRepository
    }
    async execute(userID) {
        const user = await this.deleteUserRepository.execute(userID)

        return user
    }
}
