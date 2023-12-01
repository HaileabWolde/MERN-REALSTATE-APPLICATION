import express from 'express'
import { createListing } from '../controllers/listing.js'
import { Auth } from '../middlewares/Auth.js'
const router = express.Router()

router.post('/create', Auth , createListing)

export default router;