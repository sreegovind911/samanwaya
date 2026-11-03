import './HorizontalControls.css';

export default function HorizontalControls({
  activeSection,
  sections,
  onNavigate,
  scrollProgress,
  onPrev,
  onNext,
  canPrev,
  canNext,
}) {
  return (
    <div className="horizontal-dock glass-card">
      <div className="dock-left">
        <button
          className="dock-arrow-btn"
          onClick={onPrev}
          disabled={!canPrev}
          aria-label="Previous section"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span className="dock-btn-label">Prev</span>
        </button>

        <div className="dock-pills">
          {sections.map((sec, idx) => (
            <button
              key={sec.id}
              className={`dock-pill-btn ${activeSection === sec.id ? 'active' : ''}`}
              onClick={() => onNavigate(sec.id)}
              aria-label={`Go to ${sec.label}`}
            >
              <span className="dock-pill-dot" />
              <span className="dock-pill-text">{sec.label}</span>
            </button>
          ))}
        </div>

        <button
          className="dock-arrow-btn"
          onClick={onNext}
          disabled={!canNext}
          aria-label="Next section"
        >
          <span className="dock-btn-label">Next</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>

      <div className="dock-divider" />

      <div className="dock-right">
        <div className="dock-progress-wrap">
          <div className="dock-progress-bar" style={{ width: `${scrollProgress}%` }} />
        </div>
        <div className="dock-meta">
          <span className="dock-college">Sree Vidyadhiraja College (SVRC)</span>
          <span className="dock-sep">•</span>
          <span className="dock-date">December 5, 2026</span>
        </div>
      </div>
    </div>
  );
}

