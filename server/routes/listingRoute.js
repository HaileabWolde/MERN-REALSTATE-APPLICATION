import express from 'express'
import { createListing, getListing, deleteListing, editListing, getList} from '../controllers/listing.js'
import { Auth } from '../middlewares/Auth.js'
const router = express.Router()

router.post('/create', Auth , createListing)
router.get('/list/:id', getList)
router.get('/getListing', Auth, getListing)
router.post('/editListing/:id', Auth, editListing)
router.delete('/deleteListing/:id', Auth, deleteListing)

export default router;