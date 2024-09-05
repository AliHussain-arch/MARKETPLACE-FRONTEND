import './Footer.css';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
      <div className="footContainer">
        <nav>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>
      </div>
    );
  };