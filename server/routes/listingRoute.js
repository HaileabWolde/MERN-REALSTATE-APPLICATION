import express from 'express'
import { createListing, getListing, deleteListing} from '../controllers/listing.js'
import { Auth } from '../middlewares/Auth.js'
const router = express.Router()

router.post('/create', Auth , createListing)
router.get('/getListing', Auth, getListing)
router.delete('/deleteListing/:id', Auth, deleteListing)

export default router;