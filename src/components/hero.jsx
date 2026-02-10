import { Link } from 'react-router-dom'

function Hero() {
  return (
    <header className="hero" id="hero">
      <div className="hero-content">
        <div className="hero-badge reveal">
          <span className="badge-dot"></span>
          Innovation & Incubation Cell (IIC)
        </div>
        <h1 className="hero-title reveal">
          <span className="title-line">ISL Engineering</span>
          <span className="title-line title-accent">College</span>
        </h1>
        <p className="hero-tagline reveal">"From logic to launch — build what the future runs on"</p>
        
        <div className="hero-stats reveal">
          <div className="stat-item">
            <span className="stat-number" data-count="2026">0</span>
            <span className="stat-label">Event Year</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number" data-count="12">0</span>
            <span className="stat-label">February</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">1:45</span>
            <span className="stat-label">PM Start</span>
          </div>
        </div>
        
        <div className="hero-actions reveal">
          <Link to="/register" className="btn btn-primary">
            <span>Register Now</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <a href="#about" className="btn btn-ghost">
            <span>Learn More</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </a>
        </div>
      </div>
      
      <div className="hero-visual">
        <div className="hero-image-wrapper reveal">
          <img src="/image.png" alt="Event Banner" className="hero-image" />
          <div className="image-border-glow"></div>
        </div>
        <div className="floating-card fc-1 reveal">
          <span>🎓</span> College Event
        </div>
        <div className="floating-card fc-2 reveal">
          <span>🔥</span> Trending
        </div>
        <div className="floating-card fc-3 reveal">
          <span>📍</span> Hyderabad
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </header>
  )
}

export default Hero
