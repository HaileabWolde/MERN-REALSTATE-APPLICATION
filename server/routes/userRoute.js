import express from 'express'
import { signup, signin } from '../controllers/user.js'
const router = express.Router()

router.post('/signup', signup)
router.post('/signIn', signin)

export default router;