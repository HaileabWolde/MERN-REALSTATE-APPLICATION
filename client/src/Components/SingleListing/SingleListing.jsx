import {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from "swiper/modules"
import 'swiper/css/bundle'

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
           </>
        )
    }
  </main>
) 
}
export default SingleListing;