export default function Navbar() {
  return (
    <nav className="navbar" id="navbar">
      <div className="nav-inner">

        <a href="/" className="nav-brand">
          <img src="/LOGO.png" className="nav-logo-img" />
          <span className="nav-title">
            The Institution's Innovation Council (IIC)
          </span>
        </a>

        <div className="nav-links">
          <a href="#about" className="nav-link">About</a>
          <a href="#details" className="nav-link">Details</a>
          <a href="#venue" className="nav-link">Venue</a>
          <a href="/register" className="nav-link nav-cta">
            Register Now
          </a>
        </div>

      </div>
    </nav>
  );
}
