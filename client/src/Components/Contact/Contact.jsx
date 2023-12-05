import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
 const ContactComponent = ({formdata})=>{
    const {UserRef} = formdata
    const [Listing, setListing] = useState(null)
    const [message, setMessage] = useState('')
    useEffect(()=>{
        const fetchListing = async()=>{
            const endpoint = `http://localhost:5000/users/getUser/${UserRef}`
            try{
                const res = await fetch(endpoint, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',   
                    }
                })
                const data = await res.json()
                console.log(data)
                setListing(data)
            }
            catch(error){
                console.log(error)
            }
        }
        fetchListing()
    }, [formdata.UserRef])
   
    const handlechange = (e)=>{
        setMessage(e.target.value)
    }
    console.log(message)
    return (
        <div className='flex flex-col gap-2'>
            {
                Listing && 
                <p className='text-xl'>Contact <span className='font-semibold'> {Listing.Username}</span>{' '} for <span className='font-semibold'>{formdata.name}</span></p>
            }
            <textarea
            value={message}
            onChange={handlechange}
            placeholder="enter your message here"
            className='p-5 rounded-lg border'
            rows={3}
            />
             <Link
          to={`mailto:${Listing?.email}?subject=Regarding ${formdata.name}&body=${message}`}
          className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Send Message          
          </Link>
        </div>
    )
}
export default ContactComponent;
