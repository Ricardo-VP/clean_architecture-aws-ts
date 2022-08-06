import { NextFunction, Request, Response } from 'express'

import { UserDeleterUseCase } from '../../../../application/usecases/UserDeleter'
import { DynamoDBUserRepository } from '../../../implementations/Aws/dynamo-db/DynamoDBUserRepository'

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params

  const dynamoDBUserRepo = new DynamoDBUserRepository()
  const userDeleterUseCase = new UserDeleterUseCase(dynamoDBUserRepo)

  try {
    const deletedUser = await userDeleterUseCase.execute(id)
    res.json(deletedUser)
    return
  } catch (e) {
    return next(e)
  }
}
