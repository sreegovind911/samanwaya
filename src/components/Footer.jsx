import './Footer.css';

export default function Footer({ onRegisterClick }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-glow-line" />

      <div className="footer-main-container">
        {/* Top Highlight Banner with December 5 emphasis */}
        <div className="footer-cta-card glass-card">
          <div className="cta-card-content">
            <div className="cta-badges-row">
              <span className="cta-badge">● Registration Open</span>
              <span className="cta-date-badge">📅 DECEMBER 5, 2026</span>
            </div>
            <h3>Ready to experience Samanwaya 2.0 on December 5?</h3>
            <p>Join hundreds of talented students for a full day of excitement, learning, and celebration on December 5, 2026.</p>
          </div>
          <button className="footer-action-btn" onClick={onRegisterClick}>
            <span>Register for Dec 5</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>

        {/* 4-Column Grid with Glassmorphism */}
        <div className="footer-grid glass-card">
          {/* Col 1: Brand & College Info */}
          <div className="footer-col brand-col">
            <div className="footer-brand-wrap">
              <div className="footer-brand-badge">
                <span>S</span>
              </div>
              <div className="footer-brand-name">
                <h4>SAMANWAYA</h4>
                <span className="footer-edition">2.0</span>
              </div>
            </div>

            <div className="footer-event-date-callout">
              <span className="cal-dot">🗓️</span>
              <span>Event Date: <strong>December 5, 2026</strong></span>
            </div>

            <p className="college-title">
              Shree Vidyadhiraja College of Arts and Science
            </p>
            <p className="college-location">
              Karunagappally, Kollam, Kerala - 690518
            </p>
            <p className="fest-summary">
              A premier campus mega fest celebrating youth, intellect, creativity, and cultural vibrancy.
            </p>
          </div>

          {/* Col 2: Navigation Links (Flow of program removed) */}
          <div className="footer-col">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links">
              <li>
                <a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>
                  About Samanwaya
                </a>
              </li>
              <li>
                <a href="#highlights" onClick={(e) => handleLinkClick(e, 'highlights')}>
                  Why Participate
                </a>
              </li>
              <li>
                <a href="#events" onClick={(e) => handleLinkClick(e, 'events')}>
                  Signature Events
                </a>
              </li>
              <li>
                <a href="#gallery" onClick={(e) => handleLinkClick(e, 'gallery')}>
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#register" onClick={(e) => handleLinkClick(e, 'register')}>
                  Official Registration
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Signature Events */}
          <div className="footer-col">
            <h5 className="footer-heading">Featured Events</h5>
            <ul className="footer-links">
              <li>
                <a href="#events" onClick={(e) => handleLinkClick(e, 'events')}>
                  Mega Quiz Competition
                </a>
              </li>
              <li>
                <a href="#events" onClick={(e) => handleLinkClick(e, 'events')}>
                  Treasure Hunt
                </a>
              </li>
              <li>
                <a href="#events" onClick={(e) => handleLinkClick(e, 'events')}>
                  Spot Photography
                </a>
              </li>
              <li>
                <a href="#events" onClick={(e) => handleLinkClick(e, 'events')}>
                  Managerial Games
                </a>
              </li>
              <li>
                <a href="#events" onClick={(e) => handleLinkClick(e, 'events')}>
                  Food Fest & Trade Stalls
                </a>
              </li>
              <li>
                <a href="#events" onClick={(e) => handleLinkClick(e, 'events')}>
                  Live Cultural Performances
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Socials */}
          <div className="footer-col contact-col">
            <h5 className="footer-heading">Get in Touch</h5>
            <div className="contact-item">
              <span className="contact-icon">✉</span>
              <a href="mailto:samanwaya2.0@college.in" className="contact-link">
                samanwaya2.0@college.in
              </a>
            </div>
            <div className="contact-item">
              <span className="contact-icon">☎</span>
              <a href="tel:+919876543210" className="contact-link">
                +91 98765 43210
              </a>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span className="contact-text">Campus Helpdesk & Registration Counter</span>
            </div>

            <div className="social-links-wrap">
              <span className="social-label">Follow Us</span>
              <div className="social-pills">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-pill" aria-label="Instagram">
                  Instagram
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-pill" aria-label="YouTube">
                  YouTube
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-pill" aria-label="Facebook">
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © 2026 Samanwaya 2.0 • Saturday, December 5, 2026 • Shree Vidyadhiraja College of Arts and Science.
          </p>

          <button className="back-to-top-btn" onClick={scrollToTop} aria-label="Back to top">
            <span>Back to Top</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
