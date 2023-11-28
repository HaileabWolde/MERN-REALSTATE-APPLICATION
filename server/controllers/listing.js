import Listing from "../model/Listingmodel.js";
export const createListing = async (req, res, next)=>{
    try{
        const Listed = await Listing.create(req.body)
        res.status(200).json(Listed)
    }
    catch(error){
        next(error)
    }
}