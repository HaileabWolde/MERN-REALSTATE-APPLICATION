import express from 'express'
import { createListing, getListing} from '../controllers/listing.js'
import { Auth } from '../middlewares/Auth.js'
const router = express.Router()

router.post('/create', Auth , createListing)
router.get('/getListing', Auth, getListing)

export default router;