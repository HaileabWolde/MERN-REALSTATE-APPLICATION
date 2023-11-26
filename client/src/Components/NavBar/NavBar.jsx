import { IoSearchSharp } from "react-icons/io5";
import {Link} from 'react-router-dom'
import {useSelector } from "react-redux";
const NavBar = ()=>{
    const { CurrentUser} = useSelector((state)=> state.user)
    return (
       <header className="bg-slate-200 p-2 shadow-md">
        <div className="flex justify-between max-w-6xl mx-auto p-3 items-center">
            <Link to="/">
            <h1 className="font-bold text-xl md:text-3xl">
                <span className="text-slate-500 ">Sahand</span>
                <span className="text-slate-700">Estate</span>
            </h1>
            </Link>
           
            <form className="rounded-lg bg-slate-100 flex p-4">
                <input
                type="text"
                placeholder="Search ..."
                className="bg-transparent focus:outline-none w-[200px] md:w-[300px]"
                />
                <button><IoSearchSharp/></button>
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
                <img src={CurrentUser.avator} alt="currentusername"/>
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