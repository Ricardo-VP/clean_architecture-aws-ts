import { Router } from 'express'
import userRoutes from '../../../../../users/infrastructure/driving-adapters/api-rest/routes/user.routes'

const route = Router()

route.use('/users', userRoutes)

export default route
