import express from 'express'
import { signup, signin, google } from '../controllers/user.js'
const router = express.Router()

router.post('/signup', signup)
router.post('/signIn', signin)
router.post('/OAuth', google)

export default router;