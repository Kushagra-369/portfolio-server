import { Router } from 'express'
import { create_project } from '../controller/portfolio_controller'

const router = Router()

router.post('/create_project', create_project)

export default router