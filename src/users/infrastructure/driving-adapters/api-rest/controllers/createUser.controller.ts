import { v4 as uuidv4 } from 'uuid'
import { NextFunction, Request, Response } from 'express'

import { UserCreatorUseCase } from '../../../../application/usecases/UserCreator'
import { DynamoDBUserRepository } from '../../../implementations/Aws/dynamo-db/DynamoDBUserRepository'
import { User } from '../../../../domain/entities/User'

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    username,
    age,
    name
  } = req.body

  const dynamoDBUserRepo = new DynamoDBUserRepository()
  const userCreatorUseCase = new UserCreatorUseCase(dynamoDBUserRepo)

  const userToCreate: User = {
    id: uuidv4(),
    name,
    username,
    age
  }

  try {
    const userCreated = await userCreatorUseCase.execute(userToCreate)
    res.json(userCreated)
  } catch (e) {
    return next(e)
  }
}
