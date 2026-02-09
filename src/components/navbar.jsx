import { Link } from 'react-router-dom'
import { useEffect } from 'react'

function Navbar() {
  useEffect(() => {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      if (window.innerWidth <= 768) {
        if (currentScroll > lastScroll && currentScroll > 200) {
          navbar.classList.add('hidden');
        } else {
          navbar.classList.remove('hidden');
        }
      } else {
        navbar.classList.remove('hidden');
      }
      lastScroll = currentScroll;
    };

    const handleToggle = () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    };

    const closeMenu = () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    };

    window.addEventListener('scroll', handleScroll);
    navToggle.addEventListener('click', handleToggle);

    // Close mobile menu on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      navToggle.removeEventListener('click', handleToggle);
    };
  }, []);

  return (
    <nav className="navbar" id="navbar">
      <div className="nav-inner">
        <a href="#" className="nav-brand">
          <div className="nav-logo">
            <img src="/LOGO.png" alt="IIC Logo" className="nav-logo-img" />
          </div>
          <div className="nav-brand-text">
            <span className="nav-title">IIC-ISL</span>
          </div>
        </a>
        <div className="nav-links" id="navLinks">
          <a href="#about" className="nav-link">About</a>
          <a href="#details" className="nav-link">Details</a>
          <a href="#venue" className="nav-link">Venue</a>
          <Link to="/payment" className="nav-link">Payment</Link>
          <Link to="/register" className="nav-link nav-cta">Register Now</Link>
        </div>
        <button className="nav-toggle" id="navToggle" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
