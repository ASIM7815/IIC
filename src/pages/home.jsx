import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../components/navbar.jsx'
import Hero from '../components/hero.jsx'

function Home() {
  useEffect(() => {
    // Scroll reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // Animated counter
    function animateCounters() {
      document.querySelectorAll('.stat-number[data-count]').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        function update() {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(update);
          } else {
            counter.textContent = target;
          }
        }
        update();
      });
    }

    // Trigger counter animation when hero is visible
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          heroObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) heroObserver.observe(heroStats);

    // Cursor glow
    const cursorGlow = document.getElementById('cursorGlow');
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener('mousemove', handleMouseMove);

    function updateGlow() {
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;
      if (cursorGlow) {
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
      }
      requestAnimationFrame(updateGlow);
    }
    updateGlow();

    // Parallax effect for hero on scroll
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero-content');
      const heroVisual = document.querySelector('.hero-visual');
      
      if (hero && scrolled < window.innerHeight) {
        hero.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
        hero.style.opacity = 1 - scrolled / (window.innerHeight * 0.8);
      }
      if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = 'translateY(' + (scrolled * 0.15) + 'px)';
      }

      // Active nav link on scroll
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.pageYOffset + 200;
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector('.nav-link[href="#' + id + '"]');
        
        if (link) {
          if (scrollY >= top && scrollY < top + height) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      revealElements.forEach(el => revealObserver.unobserve(el));
    };
  }, []);

  return (
    <>
      {/* Cursor Glow Effect */}
      <div className="cursor-glow" id="cursorGlow"></div>

      {/* Animated Background */}
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="gradient-orb orb-4"></div>
        <div className="grid-overlay"></div>
        <div className="noise-overlay"></div>
      </div>

      {/* Floating Particles */}
      <div className="particles" id="particles">
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Hero Header */}
      <Hero />

      {/* Main Content */}
      <main className="main-content">
        {/* About Section */}
        <section className="section" id="about">
          <div className="section-container">
            <div className="section-header reveal">
              <span className="section-label">01 — About</span>
              <h2 className="section-title">About the <span className="text-gradient">Event</span></h2>
              <div className="section-line"></div>
            </div>

            <div className="about-grid">
              <div className="about-info reveal">
                <div className="info-card">
                  <div className="info-icon">🎯</div>
                  <div className="info-content">
                    <span className="info-label">Event Title</span>
                    <p>Faculty & Student Orientation – Research and Development Program</p>
                  </div>
                </div>
                <div className="info-card">
                  <div className="info-icon">🏢</div>
                  <div className="info-content">
                    <span className="info-label">Organized By</span>
                    <p>Innovation & Incubation Cell (IIC)</p>
                  </div>
                </div>
                <div className="info-card">
                  <div className="info-icon">🎓</div>
                  <div className="info-content">
                    <span className="info-label">Institution</span>
                    <p>ISL Engineering College</p>
                  </div>
                </div>
              </div>

              <div className="about-description reveal">
                <div className="desc-card glass-card">
                  <div className="desc-accent"></div>
                  <p>
                    We are pleased to invite faculty members and students to an
                    orientation session focused on the <strong>Research and Development Program</strong>.
                    The session aims to provide a clear overview of the program,
                    its objectives, and future opportunities for participation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Details Section */}
        <section className="section section-alt" id="details">
          <div className="section-container">
            <div className="section-header reveal">
              <span className="section-label">02 — Details</span>
              <h2 className="section-title">Event <span className="text-gradient">Details</span></h2>
              <div className="section-line"></div>
            </div>

            <div className="details-grid">
              <div className="detail-card glass-card reveal">
                <div className="detail-icon-wrapper">
                  <div className="detail-icon">📅</div>
                  <div className="detail-icon-ring"></div>
                </div>
                <h3>Date</h3>
                <p className="detail-value">12th February</p>
                <p className="detail-sub">2026</p>
              </div>
              <div className="detail-card glass-card reveal">
                <div className="detail-icon-wrapper">
                  <div className="detail-icon">⏰</div>
                  <div className="detail-icon-ring"></div>
                </div>
                <h3>Time</h3>
                <p className="detail-value">1:30 PM</p>
                <p className="detail-sub">IST</p>
              </div>
              <div className="detail-card glass-card reveal">
                <div className="detail-icon-wrapper">
                  <div className="detail-icon">📍</div>
                  <div className="detail-icon-ring"></div>
                </div>
                <h3>Venue</h3>
                <p className="detail-value">E-Cell</p>
                <p className="detail-sub">ISL Engineering College</p>
              </div>
            </div>

            {/* Purpose Section */}
            <div className="purpose-section reveal">
              <div className="purpose-card glass-card">
                <h3 className="purpose-title">
                  <span className="text-gradient">Purpose of the Orientation</span>
                </h3>
                <div className="purpose-grid">
                  <div className="purpose-item">
                    <div className="purpose-number">01</div>
                    <p>Introduce the Research and Development Program</p>
                  </div>
                  <div className="purpose-item">
                    <div className="purpose-number">02</div>
                    <p>Explain program objectives and scope</p>
                  </div>
                  <div className="purpose-item">
                    <div className="purpose-number">03</div>
                    <p>Encourage faculty and student participation</p>
                  </div>
                  <div className="purpose-item">
                    <div className="purpose-number">04</div>
                    <p>Discuss future research opportunities</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Invitation */}
            <div className="invitation-section reveal">
              <div className="invitation-card">
                <div className="invitation-glow"></div>
                <div className="invitation-content">
                  <h3>You're Invited</h3>
                  <p>
                    We cordially invite all faculty members and students to attend this
                    orientation session. Your participation will be highly valuable,
                    and we look forward to your presence.
                  </p>
                  <div className="invitation-signature">
                    <div className="signature-line"></div>
                    <span>Best Regards, IIC Team</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Venue / CTA Section */}
        <section className="section" id="venue">
          <div className="section-container">
            <div className="section-header reveal">
              <span className="section-label">03 — Location</span>
              <h2 className="section-title">Event <span className="text-gradient">Venue</span></h2>
              <div className="section-line"></div>
            </div>

            <div className="venue-cta-grid">
              {/* CTA Card */}
              <div className="cta-card reveal">
                <div className="cta-bg-pattern"></div>
                <div className="cta-content">
                  <div className="cta-badge">🔥 Trending Event</div>
                  <h2>Event 2026</h2>
                  <p>Don't miss this opportunity to be part of something extraordinary. Register now and secure your spot!</p>
                  <div className="cta-meta">
                    <span>🎓 College Event</span>
                    <span>📅 Feb 12, 1:30 PM</span>
                    <span>📍 Hyderabad</span>
                  </div>
                  <Link to="/register" className="btn btn-primary btn-lg">
                    <span>Book Now</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Venue Card */}
              <div className="venue-card glass-card reveal">
                <div className="venue-pin">
                  <div className="pin-pulse"></div>
                  📍
                </div>
                <h3>Hyderabad</h3>
                <p className="venue-name">ISL Engineering College</p>
                <div className="venue-details">
                  <p>Seminar Hall-01</p>
                  <p>Bandlaguda</p>
                  <p>Hyderabad, Telangana</p>
                </div>
                <div className="venue-line"></div>
                <div className="venue-map-placeholder">
                  <div className="map-dots">
                    <span></span><span></span><span></span>
                    <span></span><span></span><span></span>
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-wave">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,70 1440,60 L1440,120 L0,120 Z" fill="rgba(10, 10, 26, 0.8)"/>
          </svg>
        </div>
        
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-col footer-main reveal">
              <div className="footer-brand">
                <div className="footer-logo">
                  <img src="/LOGO.png" alt="IIC Logo" className="footer-logo-img" />
                </div>
                <div>
                  <h3>IIC Innovation Club</h3>
                  <p className="footer-desc">Empowering students to transform ideas into reality</p>
                </div>
              </div>
              
              <div className="team-credits">
                <h4>Designed & Developed By</h4>
                <div className="team-grid">
                  <div className="team-member">
                    <span className="member-role">Full-Stack Developer</span>
                    <span className="member-name">Mohd Asim Saad</span>
                  </div>
                  <div className="team-member">
                    <span className="member-role">Website Architecture</span>
                    <span className="member-name">Tamseel Ishteyaque</span>
                  </div>
                  <div className="team-member">
                    <span className="member-role">Front End Developer</span>
                    <span className="member-name">Mohammed Qadeer</span>
                  </div>
                </div>
              </div>
              
              <div className="social-links">
                <a href="#" className="social-btn" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="social-btn" aria-label="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="social-btn" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="#" className="social-btn" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
            
            <div className="footer-col reveal">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#">About IIC</a></li>
                <li><a href="#">Events</a></li>
                <li><a href="#">Resources</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-col reveal">
              <h4>Location</h4>
              <ul className="footer-links">
                <li>
                  <span className="footer-location-icon">📍</span>
                  Bandlaguda, Hyderabad
                </li>
                <li>
                  <span className="footer-location-icon">🏫</span>
                  ISL Engineering College
                </li>
                <li>
                  <span className="footer-location-icon">🗺️</span>
                  Telangana, India
                </li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-bottom-inner">
              <p>&copy; 2026 ISL Engineering College. All rights reserved.</p>
              <p className="footer-tagline">Built with <span className="heart">💜</span> by IIC Innovation Club</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Home
