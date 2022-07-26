import { User } from '../entities/User'
import { UserNotFoundException } from '../exceptions/UserNotFoundException'
import { UserRepository } from '../repositories/UserRepository'

export class UserGetterById {
  private readonly _userRepository: UserRepository

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async execute (id: string): Promise<User> {
    const user = await this._userRepository.getById(id)

    if (user === null) { throw new UserNotFoundException() }

    return user
  }
}
