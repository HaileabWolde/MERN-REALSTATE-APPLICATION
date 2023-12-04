import {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import {useSelector} from 'react-redux'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from "swiper/modules"
import 'swiper/css/bundle'
import { MdLocationOn } from 'react-icons/md';
import {
  FaBath,
  FaBed,
  FaChair,
 FaParking,
} from 'react-icons/fa';
import ContactComponent from "../Contact/Contact"
const SingleListing = ()=>{
    SwiperCore.use([Navigation]);
    const {CurrentUser} = useSelector((state)=> state.user)
    console.log(CurrentUser._id)
    const [Loading, setLoading] = useState(false)
    const [formdata, setFormData] = useState(null)
    const [Contact, setContact] = useState(false)
    const [error, setError] = useState(false)
    const params = useParams()
    const lisitingId = params.id
  useEffect(()=>{
    const fetchListing = async()=>{
        const endpoint = `http://localhost:5000/lisiting/list/${lisitingId}`
        try{
            setLoading(true)
            const res = await fetch(endpoint, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
            })
            const data = await res.json()
            if(data.success === false){
                setError(true)
                setLoading(false)
               return
            }
            setFormData(data)
            setError(false)
            setLoading(false)
            console.log(data)
            
        }
        catch(error){
            setError(true)
            setLoading(false)
            console.log(error)
        }
    }
    fetchListing()
  }, [])

  const handleContact = ()=>{
    setContact((prev)=> !prev)
  }
return (
  <main>
    {
        Loading && <p className='text-center my-7 text-2xl'>Loading ...</p>
    }
    {
        error && <p className='text-red-7000 my-7  text-center text-2xl'>Something Went Wrong</p>
    }
    {
        !Loading && !error && formdata && (
           <div>
               <div>
           <Swiper navigation>
            {formdata.imageurl.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
           </div>
           <div className="mt-7 flex flex-col max-w-4xl mx-auto gap-4 pb-12">
                  <div className="flex gap-2">
                    <span className="text-3xl font-semibold">{formdata.name} - $</span>
                    {
                      formdata.type === "Rent" ? <span className="ml-2 text-3xl">{formdata.RegularPrice} / month</span>:
                      <span className="ml-2 text-3xl">{formdata.RegularPrice}</span>
                    }
                  </div>
                  <div className="flex">
                    <MdLocationOn  style={{ color: '#FF0000' }}   size={24}/>
                    <span>{formdata.address}</span>
                  </div>
                  <div className="flex gap-4">
                    <p className="text-white bg-red-900 text-center p-2 rounded-lg w-[180px] text-lg">{formdata.type === "Rent" ? 'For Rent': 'For Sale'}</p>
                    {
                      formdata.Discounted && <p className="text-white bg-green-900 text-center p-2 rounded-lg w-[180px] text-lg">${formdata.Discounted} discount</p>
                    }
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-lg">Description - </span>
                    <p className="ml-2 text-lg"> {formdata.description}</p>
                  </div>
                  <ul className="flex gap-4 text-green-900 text-lg">
                    <li className="flex gap-2">
                    <FaBed size={32} />
                    {
                      formdata.Beds > 1 ? `${formdata.Beds} Beds` : `${formdata.Beds} Bed`
                    }
                    </li>
                    <li className="flex gap-2">
                    < FaBath size={24}/>
                      {
                        formdata.Baths  > 1 ? 
                          `${formdata.Baths} Baths`
                        : `${formdata.Baths} Bath`
                      }
                    </li>
                    <li className="flex gap-2">
                    < FaParking size={24}/>
                     {
                      formdata.Parking ? 'Parking Spot' : 'No Parking'
                     }
                    </li>
                    <li className="flex gap-2">
                    <FaChair size={24}/>
                     {
                      formdata.Furnished ? 'Furnished' : 'Not Furnished'
                     }
                    </li>
                  </ul>
                  {
                    CurrentUser && formdata.UserRef === CurrentUser._id && !Contact && 
                    (
                      <button onClick={handleContact}>
                        Hello World
                      </button>
                    )
                  }
                  {
                    Contact && <ContactComponent formdata={formdata}/>
                  }
                
           </div>
           
           </div>
          
          
        )
    }
  </main>
) 
}
export default SingleListing;