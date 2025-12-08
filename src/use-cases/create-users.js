import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUsersRepository } from '../repositories/postgres/create-users.js'

export class CreateUserUseCase {
    async execute(CreateUserParams) {
        const UserID = uuidv4()
        const HashedPassword = bcrypt.hashSync(CreateUserParams.Password, 10)

        const NewUser = {
            ...CreateUserParams,
            ID: UserID,
            password: HashedPassword,
        }

        const CreateUserRepository = new PostgresCreateUsersRepository()

        const CreatedUser = await CreateUserRepository.execute(NewUser)

        return CreatedUser
    }
}
