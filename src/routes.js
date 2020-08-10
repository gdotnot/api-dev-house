import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/upload'

import SessionController from './controller/SessionController'
import HouseController from './controller/HouseController'
import DashBoardController from './controller/DashBoardController'


const routes = new Router()
const upload = multer(uploadConfig)

// ======= SESSIONS ROUTES =======

routes.get('/sessions', SessionController.index)
routes.post('/sessions', SessionController.store)

// ======= HOUSES ROUTES =======
routes.get('/houses', HouseController.index)
routes.post('/houses', upload.single('thumbnail'), HouseController.store)
routes.put('/houses/:house_id', upload.single('thumbnail'), HouseController.update)
routes.delete('/houses', HouseController.destroy)

// ======= DASHBOARD ROUTES =======
routes.get('/dashboard', DashBoardController.show)

export default routes
