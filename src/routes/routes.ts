import { Router } from 'express'
import { create_project , get_all_project , delete_project} from '../controller/portfolio_controller'
const multer = require("multer")


const router = Router()

const upload = multer({storage:multer.diskStorage({})})

router.post('/create_project', create_project)
router.get('/get_all_project', get_all_project)
router.delete('/delete_project/:id', delete_project)


export default router