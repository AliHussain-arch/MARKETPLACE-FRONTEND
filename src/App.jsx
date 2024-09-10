import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

// Importing Homepage component
import Homepage from "./components/Homepage/Homepage.jsx";

// Importing semantic components
import Navbar from "./components/SemanticComponents/Navbar/Navbar.jsx";
import Footer from "./components/SemanticComponents/Footer/Footer.jsx";

// Importing Authentication components
import SignUp from "./components/Authentication/SignUp/SignUp.jsx";
import SignIn from "./components/Authentication/SignIn/SignIn.jsx";

// Importing error components
import PageNotFound from "./components/ErrorComponents/PageNotFound/PageNotFound.jsx";

// Importing Footer components
import About from "./components/FooterComponents/About/About.jsx";
import Contact from "./components/FooterComponents/Contact/Contact.jsx";

// Importing Items components
import ItemsList from "./components/ItemComponents/ItemsList/ItemsList.jsx";
import ItemDetail from "./components/ItemComponents/ItemDetail/ItemDetail.jsx";
import ItemForm from "./components/ItemComponents/ItemForm/ItemForm.jsx";
import authenticationServices from "./services/authenticationServices.js";

// Importing Profile components
import ProfileList from "./components/profile/profileList/ProfileList.jsx";
import ProfileItemDetails from "./components/profile/profileItemDetail/ProfileItemDetail.jsx";
import ProfileItemForm from "./components/profile/profileItemForm/ProfileItemForm.jsx";
// Importing History components
import HistoryList from "./components/history/HistoryList.jsx";

//Importing wishlist components
import Wishlist from "./components/wishlist/WishList.jsx";


function App() {
  const [user, setUser] = useState(authenticationServices.getUser());
  return (
    <main>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<SignIn setUser={setUser} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user/:userId/item" element={<ItemsList />} />
        <Route path="/user/:userId/item/sell" element={<ItemForm />} />
        <Route
          path="/user/:userId/item/:itemId"
          element={<ItemDetail user={user} />}
        />
        <Route path="/user/:userId/profile" element={<ProfileList />} />
        <Route
          path="/user/:userId/profile/:profileId/history"
          element={<HistoryList />}
        />
        <Route path="/profile/:profileId/wishlist" element={<Wishlist />} />
        <Route
          path="/user/:userId/profile/:profileId/items/:itemId"
          element={<ProfileItemDetails />} />
        <Route path="/user/:userId/item/:itemId/edit" element={<ProfileItemForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
