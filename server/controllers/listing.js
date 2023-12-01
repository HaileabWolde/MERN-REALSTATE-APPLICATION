import Listing from "../model/Listingmodel.js";
export const createListing = async (req, res, next)=>{
    const List = req.body
    const UserId = req.userId
    try{
        const Listed = await Listing.create({...List,  UserRef: UserId})
        res.status(200).json(Listed)
    }
    catch(error){
        next(error)
    }
}