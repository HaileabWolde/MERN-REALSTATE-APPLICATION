import { MdLocationOn } from 'react-icons/md';
const RentItem = ({rentItem})=>{
    return (
        <div className="w-full md:w-[330px] bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg flex flex-col gap-2 pb-3">
      
        <img src={rentItem.imageurl[0]} alt="images" className="h-[320px] sm:h-[220px] w-full object-cover  hover:scale-105 transition-scale duration-300"/>
        <div className="flex flex-col gap-2 w-full p-3">
            <p className="text-lg truncate font-semibold text-slate-700">{rentItem.name}</p>
            <div className='flex gap-2 items-center'>
                <MdLocationOn style={{ color: '#FF0000' }} size={18}/>
                <h1 className='text-sm text-gray-600 truncate w-full'>{rentItem.address}</h1>
            </div>
            <p className='text-sm text-gray-600 '>{rentItem.description}</p>
            <p className='text-slate-500 font-semibold text-lg'>$ {
                rentItem.Offer ? rentItem.RegularPrice
                : rentItem.Discounted
                }
                {
                    rentItem.type == 'Rent' && ' / month'
                }
            </p>
            <ul className='flex flex-row gap-2 font-semibold'>
                <li>
                    {
                       rentItem.Beds > 1 ? `${rentItem.Beds} Beds` : `${rentItem.Beds} Bed`
                    }
                </li>
                <li>
                    {
                        rentItem.Baths > 1 ? `${rentItem.Baths} Baths` : `${rentItem.Baths} Bath`
                    }
                </li>
            </ul>
        </div>     
    </div>  
    )
}
export default RentItem