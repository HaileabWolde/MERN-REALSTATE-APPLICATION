import { useState } from "react"
import { useSelector } from "react-redux"
const Profile = ()=>{
    const { CurrentUser} =useSelector((state)=> state.user)
    const [formdata, setFormData] = useState({
        Username: '',
        email: '',
        password: ''
    })
    const handleChange = (e)=>{
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }
  
return (
    <div className="max-w-lg mx-auto mt-14">
        <h1 className="font-semibold text-4xl text-center">Profile</h1>
        <form className="flex flex-col gap-4">
        <img src={CurrentUser.avator} className="rounded-full h-24 w-24 object-cover mx-auto my-6 cursor-pointer" alt="avator"/>
        <input type="text" 
        placeholder="Username"
        name="Username"
        defaultValue={CurrentUser.Username}
        onChange={handleChange}
        className="p-4 border rounded-lg text-lg"/>
        <input type="email" 
        placeholder="Email"
        name="email" 
        onChange={handleChange}
        className="p-4  border rounded-lg text-lg"
        defaultValue={CurrentUser.email}
        />
        <input type="password" 
        placeholder="Password"
        onChange={handleChange}
        name="password" 
        className="p-4 border rounded-lg text-lg"
        defaultValue={CurrentUser.password}/>
        <button type="submit" className="text-white bg-slate-700 p-4 rounded-lg text-xl hover:opacity-90">UPDATE</button>
        </form>
        <div className="flex justify-between mt-5">
            <span className="text-red-700 text-lg">Delete Account</span>
            <span className="text-red-700 text-lg">Sign Out</span>
        </div>
       
    </div>
)
}
export default Profile