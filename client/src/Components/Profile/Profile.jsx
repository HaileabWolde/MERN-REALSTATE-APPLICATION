import { useSelector } from "react-redux"
const Profile = ()=>{
    const { CurrentUser} =useSelector((state)=> state.user)
return (
    <div className="max-w-lg mx-auto">
        <h1 className="font-bold text-3xl text-center mt-4">Profile</h1>
        <img src={CurrentUser.avator} className="rounded-full h-24 w-24 object-cover self-center" alt="avator"/>
        <form className="flex flex-col gap-2">
        <input type="text" placeholder="username"/>
        <input type="email" placeholder="email"/>
        <input type="password" placeholder="Password"/>
        </form>
       
    </div>
)
}
export default Profile