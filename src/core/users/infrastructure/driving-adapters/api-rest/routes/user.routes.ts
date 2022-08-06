import { Router } from 'express'

import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  updateUserController
} from '../controllers'
import exceptionHandler from './exceptions.routes'

const route = Router()

route.delete('/:id', deleteUserController)
route.put('/:id', updateUserController)
route.get('', getAllUsersController)
route.post('', createUserController)

route.use(exceptionHandler)

export default route
