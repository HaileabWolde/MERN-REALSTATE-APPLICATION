import { MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';
const OfferItem = ({offerItem})=>{
    return (
        <div className="w-full md:w-[330px] bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg flex flex-col gap-2 pb-3">
            <Link to={`/listing/${offerItem._id}`}>
            <img src={offerItem.imageurl[0]} alt="images" className="h-[320px] sm:h-[220px] w-full object-cover  hover:scale-105 transition-scale duration-300"/>
        <div className="flex flex-col gap-2 w-full p-3">
            <p className="text-lg truncate font-semibold text-slate-700">{offerItem.name}</p>
            <div className='flex gap-2 items-center'>
                <MdLocationOn style={{ color: '#FF0000' }} size={18}/>
                <h1 className='text-sm text-gray-600 truncate w-full'>{offerItem.address}</h1>
            </div>
            <p className='text-sm text-gray-600 line-clamp-2'>{offerItem.description}</p>
            <p className='text-slate-500 font-semibold text-lg'>$ {
                offerItem.Offer ? offerItem.RegularPrice
                : offerItem.Discounted
                }
                {
                   offerItem.type == 'Rent' && ' / month'
                }
            </p>
            <ul className='flex flex-row gap-2 font-semibold'>
                <li>
                    {
                       offerItem.Beds > 1 ? `${offerItem.Beds} Beds` : `${offerItem.Beds} Bed`
                    }
                </li>
                <li>
                    {
                        offerItem.Baths > 1 ? `${offerItem.Baths} Baths` : `${offerItem.Baths} Bath`
                    }
                </li>
            </ul>
        </div>     
            </Link>
        
    </div>  
    )
}
export default OfferItem