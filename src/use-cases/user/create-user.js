import { EmailAlreadyInUse } from '../../errors/user.js'

export class CreateUserUseCase {
    constructor(
        createUserRepository,
        getUserByEmailRepository,
        passwordHasher,
        idGenerator,
        TokensGeneratorAdapter,
    ) {
        this.createUserRepository = createUserRepository
        this.getUserByEmailRepository = getUserByEmailRepository
        this.passwordHasher = passwordHasher
        this.idGenerator = idGenerator
        this.tokensGeneratorAdapter = TokensGeneratorAdapter
    }
    async execute(CreateUserParams) {
        const UserID = this.idGenerator.execute()
        const HashedPassword = this.passwordHasher.execute(
            CreateUserParams.password,
        )

        const userWithProvideEmail =
            await this.getUserByEmailRepository.execute(CreateUserParams.email)

        if (userWithProvideEmail) {
            throw new EmailAlreadyInUse()
        }

        const NewUser = {
            ...CreateUserParams,
            id: UserID,
            password: HashedPassword,
        }

        const CreatedUser = await this.createUserRepository.execute(NewUser)

        return {
            ...CreatedUser,
            tokens: this.tokensGeneratorAdapter.execute(UserID),
        }
    }
}
