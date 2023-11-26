import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../../FireBase/firebase'
import { SignInSuccess } from '../../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
const OAuth = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async ()=>{
        try{
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider);
            const res = await fetch('http://localhost:5000/users/OAuth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL 
                })
            })
            const data = await res.json()
            dispatch(SignInSuccess(data))
            navigate('/')
        }
        catch(error){
            console.log('could not sign in with google', error)
        }
    }
    return (   
           <button
           onClick={handleGoogleClick} 
           className="bg-red-700 text-white p-3 rounded-lg text-sm md:text-xl hover:opacity-90" type="button">CONTINUE WITH GOOGLE</button>
    )
}
export default OAuth