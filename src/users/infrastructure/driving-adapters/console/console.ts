import { UserCreatorUseCase } from '../../../application/usecases/UserCreator'
import { User } from '../../../domain/entities/User'
import { DynamoDBUserRepository } from '../../../infrastructure/implementations/Aws/dynamo-db/DynamoDBUserRepository'
import { UserGetterUseCase } from '../../../application/usecases/UserGetter'
import { UserUpdaterUseCase } from '../../../application/usecases/UserUpdater'
import { UserDeleterUseCase } from '../../../application/usecases/UserDeleter'

(async () => {
  const dynamoDBUserRepo = new DynamoDBUserRepository()
  const userGetterUseCase = new UserGetterUseCase(dynamoDBUserRepo)
  const userCreatorUseCase = new UserCreatorUseCase(dynamoDBUserRepo)
  const userUpdaterUseCase = new UserUpdaterUseCase(dynamoDBUserRepo)
  const userDeleterUseCase = new UserDeleterUseCase(dynamoDBUserRepo)

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
