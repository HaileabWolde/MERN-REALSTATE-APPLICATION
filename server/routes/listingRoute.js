import express from 'express'
import { createListing, getListing, deleteListing, editListing, getList, SearchListing} from '../controllers/listing.js'
import { Auth } from '../middlewares/Auth.js'
const router = express.Router()
router.get('/getBySearch', SearchListing)
router.get('/getListing', Auth, getListing)
router.get('/list/:id', getList)
router.post('/create', Auth , createListing)
router.post('/editListing/:id', Auth, editListing)
router.delete('/deleteListing/:id', Auth, deleteListing)

export default router;