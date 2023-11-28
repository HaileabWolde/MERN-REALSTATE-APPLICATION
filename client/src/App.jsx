import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NavBar from './Components/NavBar/NavBar'
import Home from './Components/Home/Home'
import SignIn from './Components/SignIn/SignIn'
import About from './Components/About/About'
import Profile from './Components/Profile/Profile'
import CreateLisiting from './Components/Create-Listing/Create-Listing'
import {useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
export default function App() {
  const { CurrentUser} = useSelector((state)=> state.user)
 return (
  <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/signIn" element={<SignIn/>}/>
      <Route path="/profile" element={CurrentUser ?  <Profile/> : <Navigate to="/signIn"/>}/>
      <Route path="/create-Lisiting" element={ CurrentUser ? <CreateLisiting/>: <Navigate to="/signIn"/>}/>
    </Routes>
  </BrowserRouter>
 )
}