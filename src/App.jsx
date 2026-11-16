import { useEffect, useRef, useState } from 'react';
import './App.css';

export default function App() {
  const canvasRef = useRef(null);
  const [camCoord, setCamCoord] = useState({ x: '0.00', y: '0.00' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Interactive Cyber Grid & Particle Wave Canvas (matching the reference site's #cv)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let raf;
    let t = 0;
    let mouse = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const nx = ((e.clientX / window.innerWidth) * 2 - 1).toFixed(2);
      const ny = (-(e.clientY / window.innerHeight) * 2 + 1).toFixed(2);
      setCamCoord({ x: nx, y: ny });
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      t += 0.012;

      ctx.clearRect(0, 0, W, H);

      // Deep radial glow matching the reference site
      const radialGlow = ctx.createRadialGradient(
        W * 0.75 + Math.sin(t * 0.5) * 40,
        H * 0.45 + Math.cos(t * 0.4) * 30,
        50,
        W * 0.75,
        H * 0.45,
        Math.max(W, H) * 0.65
      );
      radialGlow.addColorStop(0, 'rgba(47, 91, 255, 0.18)');
      radialGlow.addColorStop(0.5, 'rgba(34, 211, 238, 0.06)');
      radialGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, W, H);

      // Secondary bottom-left cyan glow
      const radialGlow2 = ctx.createRadialGradient(W * 0.1, H * 0.9, 20, W * 0.1, H * 0.9, W * 0.5);
      radialGlow2.addColorStop(0, 'rgba(34, 211, 238, 0.1)');
      radialGlow2.addColorStop(1, 'transparent');
      ctx.fillStyle = radialGlow2;
      ctx.fillRect(0, 0, W, H);

      // Perspective 3D grid plane in bottom half
      const horizon = H * 0.55;
      ctx.strokeStyle = 'rgba(27, 42, 85, 0.45)';
      ctx.lineWidth = 1;

      // Horizontal lines with perspective compression
      for (let y = horizon; y < H; y += Math.max(12, (y - horizon) * 0.28)) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Vertical perspective lines converging to horizon
      const vanishX = W * 0.5 + (mouse.x - W * 0.5) * 0.15;
      const count = 26;
      for (let i = -count; i <= count; i++) {
        const bottomX = W * 0.5 + i * (W / (count * 0.8));
        ctx.beginPath();
        ctx.moveTo(vanishX, horizon);
        ctx.lineTo(bottomX, H);
        ctx.stroke();
      }

      // Flowing digital signal lines across the upper space
      const numLines = 6;
      for (let l = 0; l < numLines; l++) {
        const progress = l / numLines;
        const baseY = H * 0.25 + l * 40;
        const speed = t * 1.5 + l * 0.8;
        const alpha = 0.15 + Math.sin(t * 0.8 + l) * 0.08;

        ctx.strokeStyle = l % 2 === 0 ? `rgba(34, 211, 238, ${alpha})` : `rgba(47, 91, 255, ${alpha})`;
        ctx.lineWidth = l === 1 ? 1.5 : 0.8;

        ctx.beginPath();
        for (let x = 0; x <= W; x += 15) {
          const wave = Math.sin(x * 0.004 + speed) * 25 + Math.cos(x * 0.008 - speed * 0.6) * 15;
          const y = baseY + wave;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const events = [
    { num: '01', title: 'Mega Quiz Competition', desc: 'A high-energy knowledge battle that rewards quick thinking, accuracy and confidence across science, business and culture.', tag: 'DEC 5 · SVRC' },
    { num: '02', title: 'Treasure Hunt', desc: 'A team-based mystery challenge filled with campus clues, strategy and excitement across Sree Vidyadhiraja College grounds.', tag: 'DEC 5 · SVRC' },
    { num: '03', title: 'Spot Photography', desc: 'Capture the visual essence of the festival moment through composition, lighting, creativity and raw expressive power.', tag: 'DEC 5 · SVRC' },
    { num: '04', title: 'Managerial Games', desc: 'Put leadership, teamwork, negotiation and sharp decision-making to the test through interactive live strategy rounds.', tag: 'DEC 5 · SVRC' },
    { num: '05', title: 'Fun Games & Arena', desc: 'Experience a lively mix of interactive activities and skill contests that keep participants engaged and energized throughout.', tag: 'DEC 5 · SVRC' },
    { num: '06', title: 'Food Fest Trail', desc: 'Savor festival favorites, student culinary stalls and a vibrant social atmosphere that brings campuses together.', tag: 'DEC 5 · SVRC' },
    { num: '07', title: 'Trade Fest & Stalls', desc: 'Browse creative student showcases, entrepreneurship club ideas and vendor stalls built around innovation and community.', tag: 'DEC 5 · SVRC' },
    { num: '08', title: 'Cultural Stage Showcase', desc: 'Enjoy live music, choreography and stage performances that lift the crowd and make the campus celebration unforgettable.', tag: 'DEC 5 · SVRC' },
  ];

  const highlights = [
    { num: '01', title: 'Creative Competitions', desc: 'Brainy contests and visual storytelling designed to sharpen originality, logic and creative confidence.' },
    { num: '02', title: 'Student Leadership', desc: 'Build teamwork, strategic decision-making and presence through challenge-based collaborative rounds.' },
    { num: '03', title: 'Cultural Energy', desc: 'Experience the rhythm of music, dance and live stage performances giving the festival an electric pulse.' },
    { num: '04', title: 'Campus Exposure', desc: 'A welcoming platform for startups, student clubs and academic partners to connect with thousands across Kerala.' },
  ];

  return (
    <div className="osw">
      {/* ─── FIXED NAVBAR (Matching IEEE Open Source Week) ─── */}
      <nav aria-label="Primary">
        <div className="w">
          <a className="brand" href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
            <span className="brand-title">
              SAMANWAYA <span className="brand-edition">2.0</span>
            </span>
          </a>

          <button
            className="bg"
            aria-label="Toggle navigation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>

          <div className="ls">
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a>
            <a href="#highlights" onClick={(e) => { e.preventDefault(); scrollTo('highlights'); }}>Highlights</a>
            <a href="#events" onClick={(e) => { e.preventDefault(); scrollTo('events'); }}>Events</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a>
            <a
              className="btn"
              href="https://www.svrcollege.ac.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              College Portal
            </a>
            <a
              className="btn f"
              href="#register"
              onClick={(e) => { e.preventDefault(); scrollTo('register'); }}
            >
              Register
            </a>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-drawer">
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a>
            <a href="#highlights" onClick={(e) => { e.preventDefault(); scrollTo('highlights'); }}>Highlights</a>
            <a href="#events" onClick={(e) => { e.preventDefault(); scrollTo('events'); }}>Events</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a>
            <a
              className="btn f"
              href="#register"
              onClick={(e) => { e.preventDefault(); scrollTo('register'); }}
            >
              Register for Dec 5
            </a>
          </div>
        )}
      </nav>

      {/* ─── HERO SECTION (#hero) ─── */}
      <section id="hero" aria-label="Introduction">
        {/* Dynamic Canvas Background */}
        <div id="cv" aria-hidden="true">
          <canvas ref={canvasRef} />
        </div>

        {/* Vertical Side Monospace Label */}
        <div className="side" aria-hidden="true">
          SREE VIDYADHIRAJA COLLEGE · SAMANWAYA 2.0
        </div>

        {/* HUD Readout (Top Right) */}
        <div className="hud" aria-hidden="true">
          CAM <b>{camCoord.x}</b> / <b>{camCoord.y}</b>
          <br />
          RENDER <b>LIVE</b>
        </div>

        {/* Hero Content (.hc) */}
        <div className="hc">
          <h1 aria-label="Samanwaya 2.0 Festival">
            <div className="hl">
              <span>SAMANWAYA</span>
            </div>
            <div className="hl">
              <span className="out">2.0</span>
            </div>
            <div className="hl">
              <span>FESTIVAL</span>
            </div>
          </h1>

          <div className="hrow">
            <div>
              <p>
                Sree Vidyadhiraja College of Arts and Science (SVRC) presents its grand mega campus festival — a full day of competitions, culture, creativity and student leadership.
              </p>
              <div className="chips">
                <span>DECEMBER 5, 2026</span>
                <span>THEVARKAVU, KARUNAGAPPALLY</span>
                <span>UNIVERSITY OF KERALA</span>
              </div>
            </div>

            <div className="hero-btn-row">
              <a
                className="btn f"
                href="#register"
                onClick={(e) => { e.preventDefault(); scrollTo('register'); }}
              >
                Register Interest
              </a>
              <a
                className="btn"
                href="#events"
                onClick={(e) => { e.preventDefault(); scrollTo('events'); }}
              >
                Explore Events
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT SECTION (#about) ─── */}
      <section id="about" className="osw-sec about">
        <div className="osw-w">
          <div className="about-grid">
            <div className="about-big0" aria-hidden="true">00</div>
            <div>
              <p className="osw-k">About the Fest</p>
              <h2 className="osw-h2">
                Where talent meets <span className="osw-out">celebration.</span>
              </h2>
              <p className="about-mf">
                Samanwaya 2.0 is our premier campus festival bringing together students from schools and colleges across Kerala for a high-energy celebration of talent, intellect, art and community.
              </p>
              <p className="about-sub">
                Sree Vidyadhiraja College of Arts and Science (SVRC), established in 1995, stands as a premier institution affiliated to the University of Kerala at Thevarkavu, Karunagappally. Committed to quality higher education and holistic development through NSS, NCC, Entrepreneurship and cultural initiatives.
              </p>
            </div>
          </div>

          <div className="about-card-row">
            <article className="about-card">
              <div className="about-card-kicker">01 / INSTITUTION</div>
              <h3>Our College</h3>
              <p>
                Sree Vidyadhiraja College of Arts and Science (SVRC), established in 1995, is affiliated to the University of Kerala. Located at Thevarkavu, Karunagappally, Kollam District, Kerala — 690518.
              </p>
            </article>

            <article className="about-card">
              <div className="about-card-kicker">02 / FESTIVAL</div>
              <h3>Samanwaya 2.0</h3>
              <p>
                Eight signature competitions, live cultural performances, student trade stalls, food trails and interactive arena games make this the highlight of the campus calendar.
              </p>
            </article>

            <article className="about-card">
              <div className="about-card-kicker">03 / PARTICIPATION</div>
              <h3>All-Kerala Entry</h3>
              <p>
                Open to students from schools and colleges across the state. Compete with top minds, showcase stage arts, win prizes, and network across campuses.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ─── HIGHLIGHTS SECTION (#highlights) ─── */}
      <section id="highlights" className="osw-sec">
        <div className="osw-w">
          <p className="osw-k">Fest Highlights</p>
          <h2 className="osw-h2">
            Built for bold ideas &amp; <span className="osw-out">brilliant minds.</span>
          </h2>

          <div className="highlights-grid">
            {highlights.map((h) => (
              <article className="highlight-card" key={h.num}>
                <div className="hl-num">{h.num} / PILLAR</div>
                <h4>{h.title}</h4>
                <p>{h.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EVENTS SECTION (#events) ─── */}
      <section id="events" className="osw-sec upcoming-events">
        <div className="osw-w">
          <p className="osw-k">Signature Tracks</p>
          <h2 className="osw-h2">
            Competitions <span className="osw-out">&amp; Stages.</span>
          </h2>

          <div className="events-grid">
            {events.map((ev) => (
              <article className="event-card" key={ev.num}>
                <span className="event-num">{ev.num} / CONTEST</span>
                <h4>{ev.title}</h4>
                <p>{ev.desc}</p>
                <span className="event-tag">{ev.tag}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REGISTRATION SECTION (#register) ─── */}
      <section id="register" className="osw-sec">
        <div className="osw-w">
          <p className="osw-k">Registration Portal</p>
          <h2 className="osw-h2">
            Secure your <span className="osw-out">spot.</span>
          </h2>

          <div className="register-box">
            <div className="register-grid">
              <div className="register-left">
                <h3>Join hundreds of students on December 5</h3>
                <p>
                  Open to students from all schools and colleges. Compete, perform, explore and celebrate at SVRC on December 5, 2026. Official certificates and prizes awarded.
                </p>
              </div>

              <div className="register-right">
                <a
                  className="btn f"
                  href="https://forms.gle/Q2MdeRBEy7zNWDhg6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Registration Form ↗
                </a>
                <a
                  className="btn"
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
                >
                  Contact Desk
                </a>
              </div>
            </div>

            <div className="info-row">
              <div className="info-item">
                <div className="info-label">Date</div>
                <div className="info-val">December 5, 2026</div>
              </div>
              <div className="info-item">
                <div className="info-label">Venue</div>
                <div className="info-val">SVRC Campus, Thevarkavu</div>
              </div>
              <div className="info-item">
                <div className="info-label">Eligibility</div>
                <div className="info-val">School &amp; College Students</div>
              </div>
              <div className="info-item">
                <div className="info-label">Events</div>
                <div className="info-val">8 Signature Tracks</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT SECTION (#contact) ─── */}
      <section id="contact" className="osw-sec">
        <div className="osw-w">
          <p className="osw-k">Official Contacts</p>
          <h2 className="osw-h2">
            Get in <span className="osw-out">touch.</span>
          </h2>

          <div className="contact-grid">
            <article className="contact-card">
              <div className="contact-label">Campus Address</div>
              <div className="contact-val">
                Sree Vidyadhiraja College of Arts and Science<br />
                Thevarkavu, Karunagappally<br />
                Kollam District, Kerala — 690518
              </div>
            </article>

            <article className="contact-card">
              <div className="contact-label">Telephone</div>
              <div className="contact-val">
                <a href="tel:+914766262345">+91 476 626 2345</a><br />
                <a href="tel:+919447958248">+91 94479 58248</a><br />
                <a href="tel:+918281079138">+91 82810 79138</a>
              </div>
            </article>

            <article className="contact-card">
              <div className="contact-label">Electronic Mail</div>
              <div className="contact-val">
                <a href="mailto:info@svrcollege.ac.in">info@svrcollege.ac.in</a><br />
                <a href="mailto:admissions@svrcollege.ac.in">admissions@svrcollege.ac.in</a><br />
                <a href="mailto:principal@svrcollege.ac.in">principal@svrcollege.ac.in</a>
              </div>
            </article>

            <article className="contact-card">
              <div className="contact-label">Office Hours</div>
              <div className="contact-val">
                Monday – Friday: 9:00 AM – 5:00 PM<br />
                Saturday: 9:00 AM – 1:00 PM<br />
                Sunday: Closed
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ─── FOOTER (Matching IEEE Open Source Week) ─── */}
      <footer className="ft">
        <div className="ft-wrap">
          <div className="ft-grid">
            <div>
              <a className="ft-logo" href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
                <div className="brand-symbol">S</div>
                <span>SAMANWAYA 2.0</span>
              </a>
              <p className="ft-tag">
                Sree Vidyadhiraja College of Arts and Science — empowering youth, academic excellence, innovation and cultural unity.
              </p>
            </div>

            <div>
              <h3 className="ft-h">Contact Desk</h3>
              <ul className="ft-list">
                <li><a href="mailto:info@svrcollege.ac.in">info@svrcollege.ac.in</a></li>
                <li>Thevarkavu, Karunagappally, 690518</li>
                <li><a href="tel:+914766262345">+91 476 626 2345</a></li>
              </ul>
            </div>

            <div>
              <h3 className="ft-h">Follow Along</h3>
              <div className="ft-socials">
                <a className="ft-social" href="https://www.svrcollege.ac.in" target="_blank" rel="noopener noreferrer" aria-label="College Portal">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </a>
                <a className="ft-social" href="mailto:info@svrcollege.ac.in" aria-label="Email College">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                    <path d="m3 7 9 6 9-6"></path>
                  </svg>
                </a>
                <a className="ft-social" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="5"></rect>
                    <circle cx="12" cy="12" r="4"></circle>
                    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"></circle>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Watermark Giant Outline Text */}
          <div className="ft-big" aria-hidden="true">
            <span className="ft-big-outline">SAMANWAYA 2.0</span>
          </div>

          <div className="ft-bottom">
            <span>© 2026 Samanwaya 2.0 · Sree Vidyadhiraja College of Arts and Science</span>
            <span>Affiliated to University of Kerala · Est. 1995 · Karunagappally</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
