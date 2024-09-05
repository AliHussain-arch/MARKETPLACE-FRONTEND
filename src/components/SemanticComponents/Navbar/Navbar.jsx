import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
      <>
        <nav>
          <Link to="/">Homepage</Link>
          <Link to="/signin">Sign in</Link>
          <Link to="/signup">Sign up</Link>
        </nav>
      </>
    );
  };