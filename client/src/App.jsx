import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NavBar from './Components/NavBar/NavBar'
import Home from './Components/Home/Home'
import SignIn from './Components/SignIn/SignIn'
import About from './Components/About/About'
export default function App() {
 return (
  <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/signIn" element={<SignIn/>}/>
    </Routes>
  </BrowserRouter>
 )
}