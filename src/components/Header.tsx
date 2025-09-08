// components/Header.tsx - Navigation component
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="logo-link">
          <div className="logo-icon">
            <span className="logo-text">T</span>
          </div>
          <span className="logo-name">TruthGuard</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="menu-icon-bar"></span>
          <span className="menu-icon-bar"></span>
          <span className="menu-icon-bar"></span>
        </button>
        
        <nav className={`navigation ${isMenuOpen ? 'navigation-open' : ''}`}>
          <Link href="/" className="nav-link nav-link-active">
            Dashboard
          </Link>
          <Link href="/history" className="nav-link">
            History
          </Link>
          <Link href="/analysis" className="nav-link">
            Analysis
          </Link>
          <Link href="/education" className="nav-link">
            Education
          </Link>
          <Link href="/community" className="nav-link">
            Community
          </Link>
        </nav>
        
        <div className="header-actions">
          <button className="notification-button" aria-label="Notifications">
            <span className="notification-icon"></span>
          </button>
          <div className="user-avatar"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;