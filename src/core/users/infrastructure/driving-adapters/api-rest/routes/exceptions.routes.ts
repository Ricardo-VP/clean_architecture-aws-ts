import { NextFunction, Request, Response, Router } from 'express'
import { UserAlreadyExistsException } from '../../../../domain/exceptions/UserAlreadyExistsException'
import { UserNotFoundException } from '../../../../domain/exceptions/UserNotFoundException'

const route = Router()

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof UserAlreadyExistsException) {
    res.status(400).json({
      message: 'User already exists'
    })
  } else if (err instanceof UserNotFoundException) {
    res.status(400).json({
      message: 'User not found'
    })
  } else {
    next(err)
  }
})

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  res.status(500)
  res.json({
    error: err
  })
})

export default route
