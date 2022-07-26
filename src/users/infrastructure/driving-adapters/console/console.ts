import { UserCreatorUseCase } from '../../../application/usecases/UserCreator'
import { User } from '../../../domain/entities/User'
import { InMemoryUserRepository } from '../../../infrastructure/implementations/InMemory/InMemoryUserRepository'
import { UserGetterUseCase } from '../../../application/usecases/UserGetter'
import { UserUpdaterUseCase } from '../../../application/usecases/UserUpdater'

(async () => {
  const inMemoryUserRepo = new InMemoryUserRepository()

  // Creating users
  const userCreatorUseCase = new UserCreatorUseCase(inMemoryUserRepo)
  const userToCreate: User = {
    name: 'Luciana',
    age: 12,
    username: '',
    id: '1'
  }

  await userCreatorUseCase.execute(userToCreate)

  // Updating users
  const userUpdaterUseCase = new UserUpdaterUseCase(inMemoryUserRepo)
  await userUpdaterUseCase.execute({
    id: '1',
    username: 'Prueba'
  })

  // Getting users
  const userGetterUseCase = new UserGetterUseCase(inMemoryUserRepo)
  const usersList: User[] = await userGetterUseCase.execute()

  console.log(usersList)
})()
