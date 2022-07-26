import { User } from 'users/domain/entities/User'
import { UserRepository } from 'users/domain/repositories/UserRepository'

export class InMemoryUserRepository implements UserRepository {
  private userData: User[] = []

  async getAll (): Promise<User[]> {
    return this.userData
  }

  async save (user: User): Promise<User> {
    this.userData.push(user)
    return user
  }

  async getByUserName (username: string): Promise<User | null> {
    const userFound = this.userData.find(user => user.username === username)

    if (userFound === undefined) return null

    return userFound
  }

  async update (user: User): Promise<User> {
    const users = this.userData.filter(u => u.id !== user.id)
    users.push(user)
    this.userData = users

    return user
  }

  async delete (user: User): Promise<void> {

  }

  async getById (id: string): Promise<User | null> {
    const user = await this.userData.find(u => u.id === id)

    if (user === undefined) return null

    return user
  }
}
