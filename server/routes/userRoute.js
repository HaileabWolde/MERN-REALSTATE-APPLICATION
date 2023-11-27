import express from 'express'
import { signup, signin, google, updateuser} from '../controllers/user.js'
import { Auth } from '../middlewares/Auth.js'
const router = express.Router()

router.post('/signup', signup)
router.post('/signIn', signin)
router.post('/OAuth', google)
router.post('/update/:id', Auth,  updateuser)

export default router;