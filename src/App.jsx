import { useEffect, useRef } from 'react';
import './App.css';

export default function App() {
  const canvasRef = useRef(null);

  // Animated contour line background via canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let raf;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      t += 0.004;

      ctx.clearRect(0, 0, W, H);

      // Deep purple background gradient
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, '#1a0533');
      bg.addColorStop(0.5, '#2d0a52');
      bg.addColorStop(1, '#18063a');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Animated contour lines — wavy topographic style
      const lineCount = 28;
      for (let i = 0; i < lineCount; i++) {
        const progress = i / lineCount;
        const baseY = H * 0.05 + (H * 0.9) * progress;
        const amp = 30 + Math.sin(progress * Math.PI * 2 + t) * 20;
        const freq = 0.006 + progress * 0.003;
        const speed = t * (0.8 + progress * 0.5);

        const alpha = 0.12 + 0.22 * Math.abs(Math.sin(progress * Math.PI + t * 0.3));

        // Alternate white and purple lines
        if (i % 3 === 0) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        } else if (i % 3 === 1) {
          ctx.strokeStyle = `rgba(200, 140, 255, ${alpha * 0.8})`;
        } else {
          ctx.strokeStyle = `rgba(160, 90, 220, ${alpha * 0.6})`;
        }
        ctx.lineWidth = i % 4 === 0 ? 1.2 : 0.7;

        ctx.beginPath();
        for (let x = 0; x <= W; x += 3) {
          const y =
            baseY +
            Math.sin(x * freq + speed) * amp +
            Math.sin(x * freq * 1.7 + speed * 0.6) * (amp * 0.4) +
            Math.cos(x * freq * 0.5 + speed * 1.2) * (amp * 0.25);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Subtle glow orbs
      const orbs = [
        { x: W * 0.2, y: H * 0.3, r: 200, color: 'rgba(120, 50, 200, 0.12)' },
        { x: W * 0.75, y: H * 0.6, r: 250, color: 'rgba(170, 80, 255, 0.1)' },
        { x: W * 0.5, y: H * 0.5, r: 300, color: 'rgba(90, 30, 160, 0.08)' },
      ];
      orbs.forEach((orb) => {
        const grd = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        grd.addColorStop(0, orb.color);
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);
      });

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const events = [
    { title: 'Mega Quiz', desc: 'A high-energy knowledge battle across diverse topics with cash prizes.' },
    { title: 'Treasure Hunt', desc: 'Team-based campus challenge with clues, strategy and excitement.' },
    { title: 'Spot Photography', desc: 'Capture the story of the moment through creativity and visual expression.' },
    { title: 'Managerial Games', desc: 'Test leadership and decision-making through interactive strategy rounds.' },
    { title: 'Fun Games', desc: 'Lively interactive activities that keep the crowd engaged and energized.' },
    { title: 'Food Fest', desc: 'Festival stalls and a social atmosphere that brings everyone together.' },
    { title: 'Trade Fest', desc: 'Student showcases, startup ideas and vendor stalls for innovation.' },
    { title: 'Cultural Show', desc: 'Live music, dance and stage performances that make the event unforgettable.' },
  ];

  const stats = [
    { value: '8+', label: 'Events' },
    { value: '500+', label: 'Participants' },
    { value: '15+', label: 'Partners' },
    { value: '1', label: 'Epic Day' },
  ];

  const highlights = [
    { title: 'Creative Competitions', desc: 'Brainy contests and creative challenges sharpening originality.' },
    { title: 'Student Leadership', desc: 'Teamwork and decision-making through challenge-based collaboration.' },
    { title: 'Cultural Energy', desc: 'Music, dance and live performances filling the campus with vibrant energy.' },
    { title: 'Brand Exposure', desc: 'A stage for student clubs, startups and local vendors to connect.' },
  ];

  return (
    <>
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          display: 'block',
        }}
      />

      <div className="page">
        {/* ─── HEADER ─── */}
        <header className="header glass">
          <div className="header-inner container">
            <div className="brand">
              <div className="brand-mark">S</div>
              <span className="brand-text">SAMANWAYA <strong>2.0</strong></span>
            </div>

            <nav className="nav">
              <button onClick={() => scrollTo('about')}>About</button>
              <button onClick={() => scrollTo('events')}>Events</button>
              <button onClick={() => scrollTo('contact')}>Contact</button>
            </nav>

            <div className="date-chip">DEC 5, 2026</div>

            <button className="btn-primary" onClick={() => scrollTo('register')}>
              Register
            </button>
          </div>
        </header>

        {/* ─── HERO ─── */}
        <section className="hero container">
          <div className="hero-tag">December 5, 2026 — Karunagappally, Kerala</div>
          <h1 className="hero-title">
            Samanwaya<br />
            <span className="accent">2.0</span>
          </h1>
          <p className="hero-sub">
            Sree Vidyadhiraja College of Arts and Science (SVRC) presents its grand mega campus festival — a full day of competitions, culture, creativity and celebration.
          </p>
          <div className="hero-btns">
            <button className="btn-primary btn-lg" onClick={() => scrollTo('register')}>
              Register Now
            </button>
            <button className="btn-ghost btn-lg" onClick={() => scrollTo('events')}>
              See Events
            </button>
          </div>

          <div className="stats">
            {stats.map((s) => (
              <div className="stat-card glass" key={s.label}>
                <div className="stat-val">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── ABOUT ─── */}
        <section id="about" className="section container">
          <div className="section-label">About the Fest</div>
          <h2 className="section-title">
            Where talent meets celebration.
          </h2>
          <div className="about-grid">
            <div className="glass about-card">
              <h3>Our College</h3>
              <p>
                Sree Vidyadhiraja College of Arts and Science (SVRC), established in 1995, is affiliated to the University of Kerala. Located at Thevarkavu, Karunagappally, Kollam District, Kerala — 690518.
              </p>
              <p>
                SVRC is dedicated to quality higher education, fostering academic excellence and encouraging holistic student development through NSS, NCC, Entrepreneurship and cultural programs.
              </p>
            </div>

            <div className="glass about-card">
              <h3>Samanwaya 2.0</h3>
              <p>
                Our flagship mega campus festival brings together students from schools and colleges across Kerala for a memorable celebration of talent, creativity, leadership and culture — all in one day.
              </p>
              <p>
                Eight signature events, live cultural performances, food stalls, trade fest and interactive games make it the biggest student celebration of the year.
              </p>
            </div>
          </div>

          <div className="highlights-grid">
            {highlights.map((h) => (
              <div className="glass highlight-card" key={h.title}>
                <div className="hl-bar" />
                <h4>{h.title}</h4>
                <p>{h.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── EVENTS ─── */}
        <section id="events" className="section container">
          <div className="section-label">Event Highlights</div>
          <h2 className="section-title">8 reasons to be there on Dec 5.</h2>

          <div className="events-grid">
            {events.map((ev, i) => (
              <div className="glass event-card" key={ev.title}>
                <div className="event-num">0{i + 1}</div>
                <h4>{ev.title}</h4>
                <p>{ev.desc}</p>
                <div className="event-tag">Dec 5, 2026</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── REGISTER ─── */}
        <section id="register" className="section container">
          <div className="glass register-card">
            <div className="section-label">Registration</div>
            <h2 className="section-title">Secure your spot.</h2>
            <p className="register-sub">
              Open to students from all schools and colleges. Compete, perform, explore and celebrate at SVRC on December 5, 2026.
            </p>
            <a
              href="https://forms.gle/9t7yEj8c1WqJ89uQ7"
              target="_blank"
              rel="noreferrer"
              className="btn-primary btn-lg"
            >
              Open Registration Form
            </a>

            <div className="register-info-grid">
              <div>
                <div className="info-label">Date</div>
                <div className="info-val">December 5, 2026 (Saturday)</div>
              </div>
              <div>
                <div className="info-label">Venue</div>
                <div className="info-val">SVRC Campus, Thevarkavu, Karunagappally</div>
              </div>
              <div>
                <div className="info-label">Eligibility</div>
                <div className="info-val">School and College Students (All Kerala)</div>
              </div>
              <div>
                <div className="info-label">Events</div>
                <div className="info-val">8 Signature Events + Cultural Shows</div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CONTACT ─── */}
        <section id="contact" className="section container">
          <div className="section-label">Contact</div>
          <h2 className="section-title">Get in touch.</h2>

          <div className="contact-grid">
            <div className="glass contact-card">
              <div className="contact-label">Address</div>
              <div className="contact-val">
                Sree Vidyadhiraja College of Arts and Science<br />
                Thevarkavu, Karunagappally<br />
                Kollam, Kerala — 690518
              </div>
            </div>
            <div className="glass contact-card">
              <div className="contact-label">Phone</div>
              <div className="contact-val">
                +91 476 626 2345<br />
                +91 94479 58248<br />
                +91 82810 79138
              </div>
            </div>
            <div className="glass contact-card">
              <div className="contact-label">Email</div>
              <div className="contact-val">
                info@svrcollege.ac.in<br />
                admissions@svrcollege.ac.in
              </div>
            </div>
            <div className="glass contact-card">
              <div className="contact-label">Office Hours</div>
              <div className="contact-val">
                Mon – Fri: 9:00 AM – 5:00 PM<br />
                Saturday: 9:00 AM – 1:00 PM
              </div>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="footer glass container">
          <div className="footer-inner">
            <div className="footer-brand">
              <div className="brand-mark">S</div>
              <div>
                <div className="footer-title">SAMANWAYA 2.0</div>
                <div className="footer-college">Sree Vidyadhiraja College of Arts and Science (SVRC)</div>
              </div>
            </div>

            <div className="footer-meta">
              <span>Affiliated to University of Kerala</span>
              <span className="dot-sep">·</span>
              <span>Est. 1995</span>
              <span className="dot-sep">·</span>
              <a href="https://www.svrcollege.ac.in" target="_blank" rel="noreferrer" className="footer-link">svrcollege.ac.in</a>
            </div>

            <div className="footer-bottom">
              © 2026 Samanwaya 2.0. All rights reserved. &nbsp;|&nbsp; December 5, 2026
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
