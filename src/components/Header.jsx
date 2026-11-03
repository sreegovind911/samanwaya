import { useState } from 'react';
import './Header.css';

export default function Header({ activeSection, onNavigate, onRegisterClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'highlights', label: 'Why Join' },
    { id: 'events', label: 'Events' },
    { id: 'register', label: 'Register' },
  ];

  const handleNav = (id) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="site-header">
      <div className="header-container glass-card">
        {/* Brand Logo & Title */}
        <button className="brand-logo-btn" onClick={() => handleNav('hero')}>
          <div className="logo-badge">
            <span className="logo-letter">S</span>
          </div>
          <div className="logo-meta">
            <span className="brand-title">SAMANWAYA</span>
            <span className="brand-edition">2.0</span>
          </div>
        </button>

        {/* Date Badge - Emoji Free */}
        <div className="header-date-badge">
          <span className="date-badge-label">DATE</span>
          <span className="date-badge-val">DEC 5, 2026</span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`nav-item-btn ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => handleNav(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Header Action Button */}
        <div className="header-actions">
          <button className="header-register-btn" onClick={onRegisterClick}>
            <span>Register Now</span>
            <svg
              className="btn-arrow"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            className={`mobile-toggle-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span className="hamburger-bar bar-1" />
            <span className="hamburger-bar bar-2" />
            <span className="hamburger-bar bar-3" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-nav-drawer glass-card ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-inner">
          <div className="mobile-drawer-header">
            <span className="mobile-fest-tag">Samanwaya 2.0</span>
            <span className="mobile-date-tag">Dec 5, 2026</span>
          </div>

          <ul className="mobile-nav-list">
            {navItems.map((item, idx) => (
              <li key={item.id}>
                <button
                  className="mobile-nav-btn"
                  onClick={() => handleNav(item.id)}
                >
                  <span className="mobile-num">0{idx + 1}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mobile-cta-wrap">
            <button
              className="header-register-btn full-width"
              onClick={() => {
                setMobileMenuOpen(false);
                onRegisterClick();
              }}
            >
              <span>Register for Dec 5</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
