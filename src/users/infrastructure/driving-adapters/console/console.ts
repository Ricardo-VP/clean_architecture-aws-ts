import { UserCreatorUseCase } from '../../../application/usecases/UserCreator'
import { User } from 'users/domain/entities/User'
import { InMemoryUserRepository } from '../../../infrastructure/implementations/InMemory/InMemoryUserRepository'

(async () => {
  const inMemoryUserRepo = new InMemoryUserRepository()

  console.log(inMemoryUserRepo.userData)

  const userCreatorUseCase = new UserCreatorUseCase(inMemoryUserRepo)
  const userToCreate: User = {
    name: 'Luciana',
    age: 12,
    username: '',
    id: 'hola'
  }

  await userCreatorUseCase.execute(userToCreate)

  console.log(inMemoryUserRepo.userData)
})()
