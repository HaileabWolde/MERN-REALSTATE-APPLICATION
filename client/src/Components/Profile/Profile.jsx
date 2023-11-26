import { useSelector } from "react-redux"
const Profile = ()=>{
    const { CurrentUser} =useSelector((state)=> state.user)
return (
    <div className="max-w-lg mx-auto mt-14">
        <h1 className="font-semibold text-4xl text-center">Profile</h1>
        <img src={CurrentUser.avator} className="rounded-full h-24 w-24 object-cover mx-auto my-6" alt="avator"/>
        <form className="flex flex-col gap-4">
        <input type="text" 
        placeholder="Username"
        value={CurrentUser.Username}
        className="p-4 rounded-lg text-lg"/>
        <input type="email" 
        placeholder="Email" 
        className="p-4 rounded-lg text-lg"
        value={CurrentUser.email}
        />
        <input type="password" 
        placeholder="Password" 
        className="p-4 rounded-lg text-lg"
        value={CurrentUser.password}/>
        <button type="submit" className="text-white bg-slate-700 p-4 rounded-lg text-xl">UPDATE</button>
        </form>
        <div className="flex justify-between mt-5">
            <span className="text-red-700 text-lg">Delete Account</span>
            <span className="text-red-700 text-lg">Sign Out</span>
        </div>
       
    </div>
)
}
export default Profile