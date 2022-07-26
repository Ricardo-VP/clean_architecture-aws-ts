import { UserCreatorUseCase } from '../../../application/usecases/UserCreator'
import { User } from '../../../domain/entities/User'
import { InMemoryUserRepository } from '../../../infrastructure/implementations/InMemory/InMemoryUserRepository'
import { UserGetterUseCase } from '../../../application/usecases/UserGetter'
import { UserUpdaterUseCase } from '../../../application/usecases/UserUpdater'
import { UserDeleterUseCase } from '../../../application/usecases/UserDeleter'

(async () => {
  const inMemoryUserRepo = new InMemoryUserRepository()
  const userGetterUseCase = new UserGetterUseCase(inMemoryUserRepo)
  const userCreatorUseCase = new UserCreatorUseCase(inMemoryUserRepo)
  const userUpdaterUseCase = new UserUpdaterUseCase(inMemoryUserRepo)
  const userDeleterUseCase = new UserDeleterUseCase(inMemoryUserRepo)

  // Creating users
  const userToCreate: User = {
    name: 'Luciana',
    age: 12,
    username: '',
    id: '1'
  }

  await userCreatorUseCase.execute(userToCreate)
  const usersOne = await userGetterUseCase.execute()
  console.log(usersOne)

  // Updating users
  await userUpdaterUseCase.execute({
    id: '1',
    username: 'Prueba'
  })
  const usersTwo = await userGetterUseCase.execute()
  console.log(usersTwo)

  // Deleting users
  await userDeleterUseCase.execute('1')
  const usersThree = await userGetterUseCase.execute()
  console.log(usersThree)
})()
