import { ExistUserByUserName } from '../../domain/services/ExistUserByUserName'
import { User } from 'users/domain/entities/User'
import { UserAlreadyExistsException } from '../../domain/exceptions/UserAlreadyExistsException'
import { UserRepository } from 'users/domain/repositories/UserRepository'

export class UserCreatorUseCase {
  private readonly _userRepository: UserRepository
  private readonly _existUserByUserName: ExistUserByUserName

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
    this._existUserByUserName = new ExistUserByUserName(userRepository)
  }

  async execute (body: User): Promise<User> {
    const existUser: boolean = await this._existUserByUserName.execute(
      body.username as string
    )

    if (existUser) throw new UserAlreadyExistsException()

    const userCreated: User = await this._userRepository.save(body)
    return userCreated
  }
}
