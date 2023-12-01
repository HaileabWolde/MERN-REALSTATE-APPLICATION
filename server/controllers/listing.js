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
export const getListing = async(req, res, next)=>{
    try{
        const Lists = await Listing.find({UserRef: req.userId})
        res.status(200).json(Lists)
    }
    catch(error){
        next(error)
    }
}