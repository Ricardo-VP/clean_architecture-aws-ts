import { UserCreatorUseCase } from '../../../application/usecases/UserCreator'
import { User } from 'users/domain/entities/User'
import { InMemoryUserRepository } from '../../../infrastructure/implementations/InMemory/InMemoryUserRepository'
import { UserGetterUseCase } from '../../../application/usecases/UserGetter'

(async () => {
  const inMemoryUserRepo = new InMemoryUserRepository()

  // Creating users
  const userCreatorUseCase = new UserCreatorUseCase(inMemoryUserRepo)
  const userToCreate: User = {
    name: 'Luciana',
    age: 12,
    username: '',
    id: 'hola'
  }

  await userCreatorUseCase.execute(userToCreate)

  // Getting users
  const userGetterUseCase = new UserGetterUseCase(inMemoryUserRepo)
  const usersList: User[] = await userGetterUseCase.execute()

  console.log(usersList)
})()
