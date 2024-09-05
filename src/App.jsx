import './App.css'
import { Route, Routes } from "react-router-dom";

// Importing Homepage component
import Homepage from './components/Homepage/Homepage.jsx'

// Importing semantic components
import Navbar from './components/SemanticComponents/Navbar/Navbar.jsx'
import Footer from './components/SemanticComponents/Footer/Footer.jsx'

// Importing Authentication components
import SignUp from './components/Authentication/SignUp/SignUp.jsx'
import SignIn from './components/Authentication/SignIn/SignIn.jsx'

// Importing error components
import PageNotFound from './components/ErrorComponents/PageNotFound/PageNotFound.jsx'

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/homepage" element={<Homepage/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </>
  )
}

export default App
