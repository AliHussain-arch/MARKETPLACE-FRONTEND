import './App.css'

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
      <SignIn/>
      <Footer/>
    </>
  )
}

export default App
