import {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from "swiper/modules"
import 'swiper/css/bundle'
import { MdLocationOn } from 'react-icons/md';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
const SingleListing = ()=>{
    SwiperCore.use([Navigation]);
    const [Loading, setLoading] = useState(false)
    const [formdata, setFormData] = useState(null)
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
           <>
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
           <div className="mt-7 flex flex-col">
                  <div className="flex gap -2">
                    <span>{formdata.name} - $</span>
                    {
                      formdata.type === "Rent" ? <span className="ml-2">{formdata.RegularPrice} / month</span>:
                      <span className="ml-2">{formdata.RegularPrice}</span>
                    }
                  </div>
                  <div className="flex">
                    <MdLocationOn  style={{ color: '#FF0000' }}   size={24}/>
                    <span>{formdata.address}</span>
                  </div>
                  <div className="flex gap-4">
                    <button className="text-white bg-red-900">{formdata.type === "Rent" ? 'For Rent': 'For Sale'}</button>
                    {
                      formdata.Discounted && <button className="text-white bg-red-900">${formdata.Discounted} discount</button>
                    }
                  </div>
                  <div className="flex">
                    <span>Description - </span>
                    <p> {formdata.description}</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex gap-2">
                    <IoBedSharp size={24} style={{ color: '#8B4513' }} />
                    <span>{formdata.Beds} Beds</span>
                    </div>
                    <div className="flex gap-2">
                    <TiToilet size={24} style={{ color: '#0074D9' }} />
                    <span>{formdata.Baths} Baths</span>
                    </div>
                  </div>

           </div>
           
           </>
        )
    }
  </main>
) 
}
export default SingleListing;