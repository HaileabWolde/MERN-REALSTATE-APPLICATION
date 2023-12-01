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
export const getList = async(req, res, next)=>{
    const {id} = req.params
    try{
        const List = await Listing.findById(id)
        res.status(200).json(List)
    }
    catch(error){
        next(error)
    }
}
export const editListing = async(req, res, next)=>{
    const {id} = req.params
    try{
        const editedList = await Listing.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).json(editedList)
    }
    catch(error){
        next(error)
    }
}
export const deleteListing = async(req, res, next)=>{
    const {id} = req.params
    try{
        const deltedList = await Listing.findByIdAndDelete(id)
        res.status(200).json("Lists is deleted")
    }
    catch(error){
        next(error)
    }
}