import React from 'react'
import { useState, useEffect } from 'react';


 const ContactComponent = ({formdata})=>{
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
            }
            catch(error){
                console.log(error)
            }
        }
        fetchListing()
    })
    const {UserRef} = formdata
    return (
        <div>
            <h1>Hello World</h1>
        </div>
    )
}
export default ContactComponent;
