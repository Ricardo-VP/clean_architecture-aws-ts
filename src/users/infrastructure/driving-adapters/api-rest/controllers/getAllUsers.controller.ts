import { NextFunction, Request, Response } from 'express'
import { UserGetterUseCase } from '../../../../application/usecases/UserGetter'
import { DynamoDBUserRepository } from '../../../implementations/Aws/dynamo-db/DynamoDBUserRepository'

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const dynamoDBUserRepo = new DynamoDBUserRepository()
  const userGetterUseCase = new UserGetterUseCase(dynamoDBUserRepo)

  try {
    const users = await userGetterUseCase.execute()
    res.json(users)
    return
  } catch (e) {
    return next(e)
  }
}
