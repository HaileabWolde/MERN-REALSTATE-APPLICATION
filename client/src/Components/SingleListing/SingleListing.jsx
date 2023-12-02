import {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
const SingleListing = ()=>{
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
            <div>
                <h1>{formdata.name}
                </h1>
            </div>
        )
    }
  </main>
) 
}
export default SingleListing;