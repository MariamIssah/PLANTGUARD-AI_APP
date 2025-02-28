import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-brand">
          PlantGuard AI
        </div>
        
        <div className="nav-links">
          <NavLink 
            to="/plants" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            My Plants
          </NavLink>
          <NavLink 
            to="/calendar" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Calendar
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 