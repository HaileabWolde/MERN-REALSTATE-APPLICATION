import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NavBar from './Components/NavBar/NavBar'
import Home from './Pages/Home/Home'
import SignIn from './Components/SignIn/SignIn'
import About from './Pages/About/About'
import Profile from './Pages/Profile/Profile'
import EditListing from './Pages/EditListing/EditListing'
import CreateLisiting from './Pages/Create-Listing/Create-Listing'
import SingleListing from './Pages/SingleListing/SingleListing'
import SearchListing  from './Pages/SearchListingPage/Search'
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
      <Route path='/search' element={<SearchListing/>}/>
      <Route path="/listing/:id" element={<SingleListing/>}/>
      <Route path="/edit-listing/:id" element={<EditListing/>}/>
     
    </Routes>
  </BrowserRouter>
 )
}