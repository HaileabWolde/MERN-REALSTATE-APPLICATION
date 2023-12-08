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
export const SearchListing = async(req,res,next)=> {
    try{
        let limit = parseInt(req.query.limit) || 9
        const startIndex = parseInt(req.params.startIndex) || 0
        const SearchTerm = req.query.SearchTerm || ''
        let type = req.query.type
        if (type === 'all' || type === undefined){
            type= {$in : ['Rent', 'Sell']}
        }
        let Offer = req.query.Offer
        if (Offer === 'false' || Offer === undefined){
            Offer = {$in : [false, true]}
        }
        let Parking = req.query.Parking
        if(Parking === 'false' || Parking === undefined){
            Parking = {$in : [false, true]}
        }
        let  Furnished = req.query.Furnished
        if(Furnished === 'false' || Furnished === undefined){
            Furnished = {$in : [false, true]}
        }
        const sort = req.query.sort || 'created_at'
       
        const order = req.query.order || 'desc'
       

        const listedSearch = await Listing.find({
            name: { $regex:SearchTerm, $options: 'i' },
            type,
            Offer,
            Furnished,
            Parking
        }).sort({[sort]: order}).limit(limit).skip(startIndex)

        res.status(200).json(listedSearch);
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