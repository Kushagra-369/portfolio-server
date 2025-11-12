import { Router } from 'express'
import multer = require("multer")
import { create_project, get_all_project, delete_project, update_project, update_project_img } from '../controller/portfolio_controller'
import { create_admin ,verify_admin_otp} from '../controller/user_controller'
import { create_message , get_all_messages,delete_message } from '../controller/message_controller'
const router = Router()

const upload = multer({ storage: multer.diskStorage({}) })

router.post('/create_project', upload.single('profilePhoto'), create_project)
router.get('/get_all_project', get_all_project)
router.delete('/delete_project/:id', delete_project)
router.put('/update_project/:id', update_project)
router.put('/update_project_img/:id', upload.single('profilePhoto'), update_project_img)
router.post('/create_admin', create_admin)
router.post('/verify_admin_otp', verify_admin_otp)
router.post('/create_message', create_message)
router.get('/get_all_messages', get_all_messages)
router.delete('/delete_message/:id', delete_message)

export default router