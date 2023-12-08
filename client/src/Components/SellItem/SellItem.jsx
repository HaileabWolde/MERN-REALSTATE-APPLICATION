import { MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';
const SellItem = ({sellItem})=>{
    return (
        <div className="w-full md:w-[330px] bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg flex flex-col gap-2 pb-3">
            <Link to={`/listing/${sellItem._id}`}>
            <img src={sellItem.imageurl[0]} alt="images" className="h-[320px] sm:h-[220px] w-full object-cover  hover:scale-105 transition-scale duration-300"/>
        <div className="flex flex-col gap-2 w-full p-3">
            <p className="text-lg truncate font-semibold text-slate-700">{sellItem.name}</p>
            <div className='flex gap-2 items-center'>
                <MdLocationOn style={{ color: '#FF0000' }} size={18}/>
                <h1 className='text-sm text-gray-600 truncate w-full'>{sellItem.address}</h1>
            </div>
            <p className='text-sm text-gray-600 line-clamp-3'>{sellItem.description}</p>
            <p className='text-slate-500 font-semibold text-lg'>$ {
                sellItem.Offer ? sellItem.RegularPrice
                :sellItem.Discounted
                }
                {
                  sellItem.type == 'Rent' && ' / month'
                }
            </p>
            <ul className='flex flex-row gap-2 font-semibold'>
                <li>
                    {
                      sellItem.Beds > 1 ? `${sellItem.Beds} Beds` : `${sellItem.Beds} Bed`
                    }
                </li>
                <li>
                    {
                        sellItem.Baths > 1 ? `${sellItem.Baths} Baths` : `${sellItem.Baths} Bath`
                    }
                </li>
            </ul>
        </div>   
            </Link>
       
    </div>  
    )
}
export default SellItem