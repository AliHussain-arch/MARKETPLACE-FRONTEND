import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import authenticationServices from '../../../services/authenticationServices';

export default function Navbar({ user, setUser }) {
    const navigate = useNavigate();

    const handleSignOut = () => {
        authenticationServices.signout();
        setUser(null); 
        navigate('/'); 
    };

    return (
      <>
        <nav>
          {user ? (
            <>
              <Link to={`/user/${user.id}/item`}>Explore</Link>
              <Link to={`/user/${user.id}/profile`}>Profile</Link>
              <Link to={`/user/${user.id}/item/sell`} >Sell</Link>
              <Link to={`/fill-it-with-path`}>History</Link>
              <Link to={`/fill-it-with-path`}>Wishlist</Link>
              <Link to="/" onClick={handleSignOut}>Sign out</Link>
            </>
          ) : (
            <>
              <Link to="/">Homepage</Link>
              <Link to="/signin">Sign in</Link>
              <Link to="/signup">Sign up</Link>
            </>
          )}
        </nav>
      </>
    );
}
