import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { EmailAlreadyInUse } from '../errors/user.js'

export class CreateUserUseCase {
    constructor(createUserRepository, getUserByEmailRepository) {
        this.createUserRepository = createUserRepository
        this.getUserByEmailRepository = getUserByEmailRepository
    }
    async execute(CreateUserParams) {
        const UserID = uuidv4()
        const HashedPassword = bcrypt.hashSync(CreateUserParams.password, 10)

        const userWithProvideEmail =
            await this.getUserByEmailRepository.execute(CreateUserParams.email)

        if (userWithProvideEmail) {
            throw new EmailAlreadyInUse()
        }

        const NewUser = {
            ...CreateUserParams,
            ID: UserID,
            password: HashedPassword,
        }

        const CreatedUser = await this.createUserRepository.execute(NewUser)

        return CreatedUser
    }
}
