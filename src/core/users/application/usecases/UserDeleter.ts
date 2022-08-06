import { UserGetterById } from '../../domain/services/UserGetterById'
import { UserRepository } from '../../domain/repositories/UserRepository'
import { User } from '../../domain/entities/User'

export class UserDeleterUseCase {
  private readonly _userRepository: UserRepository
  private readonly _userGetterById: UserGetterById

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
    this._userGetterById = new UserGetterById(userRepository)
  }

  async execute (userId: string): Promise<User> {
    const userToDelete = await this._userGetterById.execute(userId)

    await this._userRepository.delete(userToDelete)

    return userToDelete
  }
}
