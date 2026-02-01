import { InvalidPasswordError, UserNotFoundError } from '../../errors/user.js'

export class LoginUserUseCase {
    constructor(
        GetUserByEmailRepository,
        PasswordComparatorAdapter,
        TokensGeneratorAdapter,
    ) {
        this.GetUserByEmailRepository = GetUserByEmailRepository
        this.PasswordComparatorAdapter = PasswordComparatorAdapter
        this.TokensGeneratorAdapter = TokensGeneratorAdapter
    }
    async execute(email, password) {
        const user = await this.GetUserByEmailRepository.execute(email)

        if (!user) {
            throw new UserNotFoundError()
        }

        const isPasswordValid = this.PasswordComparatorAdapter.execute(
            password,
            user.password,
        )

        if (!isPasswordValid) {
            throw new InvalidPasswordError()
        }

        return {
            ...user,
            tokens: this.TokensGeneratorAdapter.execute(user.id),
        }
    }
}
