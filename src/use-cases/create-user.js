import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js'
import { PostgresGetUserByEmail } from '../repositories/postgres/get-user-by-email.js'

export class CreateUserUseCase {
    async execute(CreateUserParams) {
        const UserID = uuidv4()
        const HashedPassword = bcrypt.hashSync(CreateUserParams.password, 10)

        const postgresGetUserByEmail = new PostgresGetUserByEmail()

        const userWithProvideEmail = postgresGetUserByEmail.execute(
            CreateUserParams.email,
        )

        if (userWithProvideEmail) {
            throw new Error('The provide email is already in use.')
        }

        const NewUser = {
            ...CreateUserParams,
            ID: UserID,
            password: HashedPassword,
        }

        const CreateUserRepository = new PostgresCreateUserRepository()

        const CreatedUser = await CreateUserRepository.execute(NewUser)

        return CreatedUser
    }
}
