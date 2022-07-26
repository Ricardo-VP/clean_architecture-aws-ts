import { User } from '../../domain/entities/User'
import { UserGetterById } from '../../domain/services/UserGetterById'
import { UserRepository } from '../../domain/repositories/UserRepository'

export class UserUpdater {
  private readonly _userRepository: UserRepository
  private readonly _userGetterById: UserGetterById

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
    this._userGetterById = new UserGetterById(userRepository)
  }

  async execute (data: User): Promise<User> {
    const user = await this._userGetterById.execute(data.id)

    const dataToUpdate: User = {
      age: data.age ?? user.age,
      name: data.name ?? user.name,
      id: data.id ?? user.id,
      username: data.username ?? user.username
    }

    const userUpdate: User = await this._userRepository.update(dataToUpdate)
    return userUpdate
  }
}
