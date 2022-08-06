import { NextFunction, Request, Response } from 'express'

import { UserUpdaterUseCase } from '../../../../application/usecases/UserUpdater'
import { DynamoDBUserRepository } from '../../../implementations/Aws/dynamo-db/DynamoDBUserRepository'
import { User } from '../../../../domain/entities/User'

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    username,
    age,
    name
  } = req.body

  const { id } = req.params

  const dynamoDBUserRepo = new DynamoDBUserRepository()
  const userUpdaterUseCase = new UserUpdaterUseCase(dynamoDBUserRepo)

  const userToUpdate: User = {
    id,
    name,
    username,
    age
  }

  try {
    const user = await userUpdaterUseCase.execute(userToUpdate)
    res.json(user)
    return
  } catch (e) {
    return next(e)
  }
}
