export class GetUserByIdUseCase {
    constructor(getUserByIdRepoitory) {
        this.getUserByIdRepoitory = getUserByIdRepoitory
    }

    async execute(userID) {
        const user = await this.getUserByIdRepoitory.execute(userID)

        return user
    }
}
