import express from 'express'
import { signup, signin, google, updateuser, deleteuser, getUser} from '../controllers/user.js'
import { Auth } from '../middlewares/Auth.js'
const router = express.Router()
router.get('/getUser/:id', getUser)
router.post('/signup', signup)
router.post('/signIn', signin)
router.post('/OAuth', google)
router.post('/update/:id', Auth,  updateuser)
router.delete('/delete/:id', Auth, deleteuser)

export default router;