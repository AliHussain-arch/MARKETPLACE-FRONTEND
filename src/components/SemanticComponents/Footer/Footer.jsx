import { Link } from 'react-router-dom';

export default function Footer() {
    return (
      <div className="footContainer">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact Us</Link>
      </div>
    );
  };