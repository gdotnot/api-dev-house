import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/upload'

import SessionController from './controller/SessionController'
import HouseController from './controller/HouseController'


const routes = new Router()
const upload = multer(uploadConfig)

routes.post("/sessions", SessionController.store)

routes.post("/houses", upload.single("thumbnail"), HouseController.store)


export default routes
