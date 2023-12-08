import { useState, useEffect } from "react"
import RentItem from "../RentItem/RentItem"
import OfferItem from "../OfferItem/OfferItem"
import SellItem from "../SellItem/SellItem"
const Home = ()=>{
    const [Offer, setOffer] = useState([])
    const [Rent, setRent] = useState([])
    const [Sell, setSell] = useState([])

    useEffect(() => {
        const fetchOffer = async () => {
            try {
                const res = await fetch('http://localhost:5000/lisiting/getBySearch?Offer=true');
                const data = await res.json();
               setOffer(data)
            } catch (error) {
                console.log(error);
            }
        };
    
        const fetchRent = async () => {
            try {
                const res = await fetch('http://localhost:5000/lisiting/getBySearch?type=Rent');
                const data = await res.json();
                setRent(data)
              
            } catch (error) {
                console.log(error);
            }
        };
        const fetchSell = async () => {
            try {
                const res = await fetch('http://localhost:5000/lisiting/getBySearch?type=Sell');
                const data = await res.json();
                setSell(data)
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchOffer();
        fetchRent();
        fetchSell()
    }, []);
    return (
        <div>
              {
        Offer && Rent && Sell && (
            <div className="max-w-6xl flex flex-col mx-auto gap-8">
                    <div className="flex gap-12 flex-wrap w-full">
                        {
                            Offer.map((offerItem)=> <OfferItem offerItem={offerItem}/>)
                        }
                    </div>
                    <div className="flex gap-8 flex-wrap w-full">
                        {
                            Rent.map((rentItem)=> <RentItem rentItem={rentItem}/>)
                        }
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

