import { useState, useEffect } from "react"
import {Link} from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from "swiper/modules"
import 'swiper/css/bundle'
import RentItem from "../../Components/RentItem/RentItem"
import OfferItem from "../../Components/OfferItem/OfferItem"
import SellItem from "../../Components/SellItem/SellItem"
const Home = ()=>{
    
    const [Offer, setOffer] = useState([])
    const [Rent, setRent] = useState([])
    const [Sell, setSell] = useState([])
    SwiperCore.use([Navigation]);
    useEffect(() => {
        const fetchOffer = async () => {
            try {
                const res = await fetch('https://plain-jade-housecoat.cyclic.app/lisiting/getBySearch?Offer=true&limit=4');
                const data = await res.json();
                console.log(data)
               setOffer(data)
               fetchRent();
            } catch (error) {
                console.log(error);
            }
        };
    
        const fetchRent = async () => {
            try {
                const res = await fetch('https://plain-jade-housecoat.cyclic.app/lisiting/getBySearch?type=Rent&limit=4');
                const data = await res.json();
                setRent(data)
                fetchSell()
            } catch (error) {
                console.log(error);
            }
        };
        const fetchSell = async () => {
            try {
                const res = await fetch('https://plain-jade-housecoat.cyclic.app/lisiting/getBySearch?type=Sell&limit=4');
                const data = await res.json();
                setSell(data)
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchOffer();
    }, []);
    return (
        <div>
            <div className="max-w-6xl flex flex-col gap mx-auto py-28 px-3">
                <h1 className="text-3xl text-slate-700 md:text-7xl font-bold">
                    Find your next <span className="text-slate-500">perfect</span>
                   <br/>
                   place with ease
                </h1>
                <label className=" text-xs md:text-xl text-gray-400 py-7">Sahand Estate will help you find your home fast, easy and comfortable.
                <br/>
                Our expert support are always available.
                </label>
                <Link to="/search" className="font-bold hover:underline text-blue-800 text-xs md:text-lg">
                    Let's Start now....
                </Link>
            </div>
            
          {/* swiper */}
      <Swiper navigation>
        {Offer &&
          Offer.length > 0 &&
          Offer.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
               style={{
                backgroundImage: `url(${listing.imageurl[1]})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% auto',
                height: '500px',
              }}
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
              {
        Offer && Rent && Sell && (
            <div className="max-w-6xl flex flex-col mx-auto gap-8 py-12">
                <div className='my-8'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className=' text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
                    <div className="flex gap-12 flex-wrap w-full">
                        
                        {
                            Offer.map((offerItem)=> <OfferItem offerItem={offerItem}/>)
                        }
                    </div>
                    <div className='my-3'>
                     <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
                    <Link className=' text-blue-800 hover:underline' to={'/search?type=Rent'}>Show more places for Rent</Link>
                    </div>
                    
                    <div className="flex gap-8 flex-wrap w-full">
                        {
                            Rent.map((rentItem)=> <RentItem rentItem={rentItem}/>)
                        }
                    </div>
                    <div className='my-3'>
                     <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
                    <Link className=' text-blue-800 hover:underline' to={'/search?type=Sell'}>Show more places for sale</Link>
                    </div>
                    <div className="flex gap-8 flex-wrap w-full">
                        {
                            Sell.map((sellItem)=> <SellItem sellItem={sellItem}/>)
                        }
                    </div>
            </div>
        )
       }
        </div>
     
    )
}
export default Home

