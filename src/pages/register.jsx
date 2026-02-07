import { Link } from 'react-router-dom'
import '../register.css'

function Register() {
  return (
    <>
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Back Button */}
      <Link to="/" className="back-button fade-in-down">
        <span>←</span> Back to Event
      </Link>

      <div className="form-container glass-card fade-in-up">
        <div className="form-header">
          <div className="icon-badge">🎓</div>
          <h1 className="gradient-text">R&D Orientation Program</h1>
          <div className="event-info">
            Faculty & Student Orientation – Research and Development Program
          </div>

          <div className="quote">
            <span className="quote-icon">💡</span>
            "Debug your doubts, compile your dreams."
          </div>
        </div>

        {/* TICKET DETAILS */}
        <div className="section">
          <h2>Ticket Details</h2>

          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" required />
          </div>

          <div className="form-group">
            <label>College Name</label>
            <input type="text" placeholder="ISL Engineering College" required />
          </div>

          <div className="row">
            <div className="form-group">
              <label>Department</label>
              <select required>
                <option value="">Select Department</option>
                <option>CSE</option>
                <option>ECE</option>
                <option>AIDS</option>
                <option>MECH</option>
                <option>CIVIL</option>
              </select>
            </div>

            <div className="form-group">
              <label>Section</label>
              <select>
                <option value="">Select Section</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Roll Number</label>
              <input type="text" placeholder="Enter roll number" required />
            </div>

            <div className="form-group">
              <label>Current Year</label>
              <select required>
                <option value="">Select Year</option>
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" placeholder="Enter phone number" required />
          </div>

          <div className="form-group">
            <label>Email ID</label>
            <input type="email" placeholder="example@gmail.com" required />
            <div className="note">
              This email address will receive a copy of the e-ticket.
            </div>
          </div>
        </div>

        {/* EVENT PARTICIPATION */}
        <div className="section">
          <h2>
            Event Participation Query
            <span className="optional">(Optional)</span>
          </h2>

          <div className="form-group">
            <label>Selected Event</label>
            <select>
              <option>R&D Orientation Program</option>
            </select>
          </div>

          <div className="form-group">
            <label>Team Name</label>
            <input type="text" placeholder="If applicable" />
          </div>

          <div className="form-group">
            <label>Number of Team Members</label>
            <select>
              <option>Individual</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
        </div>

        <button className="submit-btn">Submit Registration</button>

        <div className="footer-quote">
          <span className="sparkle">✨</span>
          "Miss the event, and you will hear about it later."
          <span className="sparkle">✨</span>
        </div>
      </div>

      <footer className="modern-footer">
        <div className="footer-content-simple">
          <p>&copy; 2026 ISL Engineering College - Innovation & Incubation Cell</p>
          <p className="footer-tagline">Built with 💜 by IIC Team</p>
        </div>
      </footer>
    </>
  )
}

export default Register
