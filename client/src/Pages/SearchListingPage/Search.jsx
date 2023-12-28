import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Listing from "../../Components/Each Searched Item/Listing"
const SearchListing = ()=>{
    const navigate = useNavigate()
    const [showmore, setShowMore] = useState(false)
    const [loading, setLoading] = useState(true)
    const [listing, setListing] = useState([])
    const [formdata, setFormData] = useState({
        SearchTerm: '',
        Offer: false,
        type: 'all',
        Parking: false,
        Furnished: false,
        sort: 'createdAt',
        order: 'desc' // Add the 'order' property here
      })
    const handleChange = (e)=>{
        if(e.target.id === 'SearchTerm'){
            setFormData({
                ...formdata,
                [e.target.id] : e.target.value
            })}
        if(e.target.id === 'Rent' || e.target.id === 'Sell' || e.target.id === 'all'){
            setFormData(
                {
                    ...formdata,
                    type: e.target.id
                }
            )}
        if(e.target.id === 'Offer' || e.target.id === 'Parking' || e.target.id === 'Furnished'){
            setFormData(
                {
                    ...formdata,
                    [e.target.id] : e.target.checked
                }
            )}
            if(e.target.id === 'sort_order'){
                const value = e.target.value.split('_')
                const sort = value[0] || 'createdAt'
                const order = value[1] || 'desc'
                setFormData(
                    {
                        ...formdata,
                        sort,
                        order
                    }
                )}
    }
       
  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search)
    const searchTermFromUrl = urlParams.get('SearchTerm')
    const typeTermFromUrl = urlParams.get('type')
    const offerTermFromUrl = urlParams.get('Offer')
    const parkingTermFromUrl = urlParams.get('Parking')
    const furnishedTermFromUrl = urlParams.get('Furnished')
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if(searchTermFromUrl || typeTermFromUrl || offerTermFromUrl ||  sortFromUrl || orderFromUrl){
        setFormData({
            SearchTerm: searchTermFromUrl || '',
            type: typeTermFromUrl || 'all',
            Offer: offerTermFromUrl === 'true' ? true : false,
            Parking: parkingTermFromUrl === 'true' ? true : false,
            Furnished: furnishedTermFromUrl === 'true' ? true : false,
            sort: sortFromUrl || 'created_at',
            order: orderFromUrl || 'desc',
        })
    }
    const searchQuery = urlParams.toString()
    const fetchListing = async()=>{
        let endpoint = `https://curious-toad-sweater.cyclic.app/lisiting/getBySearch?${searchQuery}`
        try{
            setLoading(true)
            setShowMore(false)
            const res = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json' 
                }
            })
            const data = await res.json()
           
            if(data.length > 8){
                setShowMore(true)
            }
            else{
                setShowMore(false)
            }
            setListing(data)
            setLoading(false)
           
        }
        catch(error){
            console.log(error)
        }
       
    }
    fetchListing()
  }, [window.location.search])

  const handleSubmit = (e)=>{
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    try{
    urlParams.set('SearchTerm', formdata.SearchTerm)
    urlParams.set('type', formdata.type)
    urlParams.set('Offer', formdata.Offer)
    urlParams.set('Furnished', formdata.Furnished)
    urlParams.set('Parking', formdata.Parking)
    urlParams.set('sort', formdata.sort)
    urlParams.set('order', formdata.order)
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`)
    }
    catch(error){
        console.log(error.message)
    }
    
  }

  const handleShowMore = async ()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const Index = listing.length
    urlParams.set('startIndex', Index)
    const searchQuery = urlParams.toString()
    try{
        const res = await fetch(`https://curious-toad-sweater.cyclic.app/lisiting/getBySearch?${searchQuery}`)
        const data = await res.json()
        if(data.length > 8){
            setShowMore(true)
        }else{
            setShowMore(false)
        }
        setListing([...listing, ...data])
    }
    catch(error){
        console.log(error)
    }           
  }
  
    return (
        <div className="flex flex-col md:flex-row p-5">
            <div className="border-b-2 md:border-r-2 md:min-h-screen p-7">
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap">Search Term</label>
                        <input
                            type="text"
                            placeholder="Search..."
                            id="SearchTerm"
                            className="rounded-lg w-full p-3"
                            value={formdata.SearchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <label>Type:</label>
                        <div className="flex gap-2">
                            <input
                            type="checkbox"
                            className="w-5"
                            id="all"
                            onChange={handleChange}
                            checked={formdata.type === 'all'}
                            />
                            <span>Rent & Sale</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                            type="checkbox"
                            className="w-5"
                            id="Rent"
                            onChange={handleChange}
                            checked={formdata.type === 'Rent'}
                            />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                            type="checkbox"
                            className="w-5"
                            id="Sell"
                            onChange={handleChange}
                            checked={formdata.type === 'Sell'}
                            />
                            <span>Sale</span>
                        </div>
                        <div className="flex flex-row gap-2">
                            <input
                            type="checkbox"
                            className="w-5"
                            id="Offer"
                            value={formdata.Offer}
                            onChange={handleChange}
                            checked={formdata.Offer === true}
                            />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <label>Amenties:</label>
                        <div className="flex gap-2">
                            <input
                            type="checkbox"
                            className="w-5"
                            id="Parking"
                            value={formdata.Parking}
                            checked={formdata.Parking === true}
                            onChange={handleChange}
                            />
                            <span>Parking</span>

                        </div>
                        <div className="flex gap-2">
                            <input
                            type="checkbox"
                            className="w-5"
                            id="Furnished"
                            checked={formdata.Furnished === true}
                            value={formdata.Furnished}
                            onChange={handleChange}
                            />
                            <span>Furnished</span>
                        </div>
                       
                    </div>
                    <div className="flex items-center gap-2">
                            <label className="font-semibold">Sort:</label>
                            <select 
                            className="border rounded-lg p-3" 
                            id="sort_order"
                            defaultValue={'created_at_desc'} 
                            onChange={handleChange}>
                                <option  value="price_desc">Price hight to low</option>
                                <option value="price_asc">Price low to high</option>
                                <option value="createdAt_desc">Latest</option>
                                <option value="createdAt_asc">Oldest</option>
                            </select>
                        </div>
                    <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95' type="submit">
                        Search
                    </button>
                </form>
                   
            </div>
            <div className="p-8">
               
                <h1 className="font-semibold text-3xl mb-2">Listing results:</h1>
                {!loading && listing.length === 0 && (
                        <p className='text-xl text-slate-700'>No listing found!</p>
                 )}
                 {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>)}
                {
                    listing && 
                    <div className="flex gap-8 flex-wrap">
                        {
                            listing.map((listed, index)=> <Listing listed={listed}/>)
                        }
                    </div>
                }
                 {
                showmore && <button className="w-full text-center pt-7 hover:underline text-green-700 text-lg" onClick={handleShowMore}>Show more</button>
            }
            </div>
           
        </div>
    )
}
export default SearchListing