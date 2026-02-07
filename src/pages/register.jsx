import { Link } from 'react-router-dom'
import '../register.css'

function Register() {
  return (
    <div className="reg-page">
      {/* Animated Background */}
      <div className="reg-bg">
        <div className="reg-orb reg-orb-1"></div>
        <div className="reg-orb reg-orb-2"></div>
        <div className="reg-orb reg-orb-3"></div>
        <div className="reg-grid-overlay"></div>
      </div>

      {/* Back Navigation */}
      <nav className="reg-nav">
        <Link to="/" className="reg-back-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Event
        </Link>
      </nav>

      {/* Main Form Card */}
      <main className="reg-main">
        <div className="reg-card">
          {/* Header */}
          <div className="reg-header">
            <div className="reg-icon">
              <span>🎓</span>
              <div className="reg-icon-ring"></div>
            </div>
            <h1>R&D Orientation Program</h1>
            <p className="reg-subtitle">Faculty & Student Orientation – Research and Development Program</p>
            <div className="reg-quote">
              <span className="reg-quote-accent"></span>
              <p>💡 "Debug your doubts, compile your dreams."</p>
            </div>
          </div>

          {/* Form */}
          <form className="reg-form" onSubmit={(e) => e.preventDefault()}>
            {/* Section: Ticket Details */}
            <fieldset className="reg-fieldset">
              <legend>
                <span className="reg-legend-bar"></span>
                Ticket Details
              </legend>

              <div className="reg-field">
                <label htmlFor="fullName">Full Name</label>
                <input id="fullName" type="text" placeholder="Enter your full name" required />
              </div>

              <div className="reg-field">
                <label htmlFor="college">College Name</label>
                <input id="college" type="text" placeholder="ISL Engineering College" required />
              </div>

              <div className="reg-row">
                <div className="reg-field">
                  <label htmlFor="dept">Department</label>
                  <select id="dept" required>
                    <option value="">Select Department</option>
                    <option>CSE</option>
                    <option>ECE</option>
                    <option>AIDS</option>
                    <option>MECH</option>
                    <option>CIVIL</option>
                  </select>
                </div>
                <div className="reg-field">
                  <label htmlFor="section">Section</label>
                  <select id="section">
                    <option value="">Select Section</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                  </select>
                </div>
              </div>

              <div className="reg-row">
                <div className="reg-field">
                  <label htmlFor="roll">Roll Number</label>
                  <input id="roll" type="text" placeholder="Enter roll number" required />
                </div>
                <div className="reg-field">
                  <label htmlFor="year">Current Year</label>
                  <select id="year" required>
                    <option value="">Select Year</option>
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                </div>
              </div>

              <div className="reg-field">
                <label htmlFor="phone">Phone Number</label>
                <input id="phone" type="tel" placeholder="Enter phone number" required />
              </div>

              <div className="reg-field">
                <label htmlFor="email">Email ID</label>
                <input id="email" type="email" placeholder="example@gmail.com" required />
                <span className="reg-hint">This email will receive a copy of the e-ticket.</span>
              </div>
            </fieldset>

            {/* Section: Event Participation */}
            <fieldset className="reg-fieldset">
              <legend>
                <span className="reg-legend-bar"></span>
                Event Participation
                <span className="reg-optional">Optional</span>
              </legend>

              <div className="reg-field">
                <label htmlFor="event">Selected Event</label>
                <select id="event">
                  <option>R&D Orientation Program</option>
                </select>
              </div>

              <div className="reg-row">
                <div className="reg-field">
                  <label htmlFor="team">Team Name</label>
                  <input id="team" type="text" placeholder="If applicable" />
                </div>
                <div className="reg-field">
                  <label htmlFor="members">Team Members</label>
                  <select id="members">
                    <option>Individual</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                </div>
              </div>
            </fieldset>

            {/* Submit */}
            <button type="submit" className="reg-submit">
              <span>Submit Registration</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </form>

          {/* Footer Quote */}
          <div className="reg-footer-quote">
            ✨ "Miss the event, and you will hear about it later." ✨
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="reg-footer">
        <p>&copy; 2026 ISL Engineering College - Innovation & Incubation Cell</p>
        <p>Built with 💜 by IIC Team</p>
      </footer>
    </div>
  )
}

export default Register
