import { IoSearchSharp } from "react-icons/io5";
import {Link} from 'react-router-dom'
import {useSelector } from "react-redux";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
const NavBar = ()=>{
    const navigate = useNavigate()
    const { CurrentUser} = useSelector((state)=> state.user)
    const [message, setMessage] = useState('')

    const handleSearch = (e)=>{
        e.preventDefault()
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('SearchTerm', message)
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)

    }
    const handlechange = (e)=>{
        setMessage(e.target.value)
    }

    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const value = urlParams.get('SearchTerm')

        if(value){
            setMessage(value)
        }
      
    }, [window.location.search])
  
    return (
       <header className="bg-slate-200 p-2 shadow-md">
        <div className="flex justify-between max-w-6xl mx-auto p-3 items-center">
            <Link to="/">
            <h1 className="font-bold text-xl md:text-3xl">
                <span className="text-slate-500 ">REAL</span>
                <span className="text-slate-700">ESTATE</span>
            </h1>
            </Link>
           
            <form className="rounded-lg bg-slate-100 flex p-4" onSubmit={handleSearch}>
                <input
                type="text"
                placeholder="Search ..."
                className="bg-transparent focus:outline-none w-[200px] md:w-[300px]"
                value={message}
                onChange={handlechange}
                />
                <button type="submit"><IoSearchSharp/></button>
            </form>
            <ul className="flex gap-4 text-xl">
                <Link to="/">
                    <li className="hidden md:inline hover:underline">Home</li>
                </Link>
               <Link to="/about">
                    <li className="hidden md:inline hover:underline">About</li>
               </Link>
               {
                CurrentUser ? 
                <Link to="/profile">
                <img src={CurrentUser.avator} className="rounded-full h-8 w-8 object-cover" alt="currentusername"/>
                </Link> :  
                <Link to="/signIn">
                    <li className="hover:underline">SignIn</li>
               </Link>
                
               }
              
              
            </ul>
        </div>
       </header>
    )
}
export default NavBar