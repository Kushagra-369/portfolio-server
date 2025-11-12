import { Router } from 'express'
import multer = require("multer")
import { create_project, get_all_project, delete_project, update_project, update_project_img } from '../controller/portfolio_controller'
import { create_admin ,verify_admin_otp , create_new_profile , get_new_profile} from '../controller/user_controller'
import { create_message , get_all_messages,delete_message , send_rating ,get_ratings } from '../controller/message_controller'
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
router.post('/send_rating', send_rating)
router.get('/get_ratings', get_ratings)
router.post('/create_new_profile', upload.fields([{ name: 'profileImg', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), create_new_profile);
router.get('/get_new_profile', get_new_profile);

export default router