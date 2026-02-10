import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { supabase } from '../supabaseClient'
import '../register.css'

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    college: 'ISL ENGINEERING COLLEGE',
    department: '',
    section: '',
    rollNumber: '',
    year: '',
    phone: '',
    email: '',
    idea: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [wordCount, setWordCount] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIdeaChange = (e) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const count = words.length;
    
    if (count <= 700) {
      setFormData({ ...formData, idea: text });
      setWordCount(count);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const { data, error } = await supabase
        .from('registrations')
        .insert([
          {
            full_name: formData.fullName,
            college: formData.college,
            department: formData.department,
            section: formData.section,
            roll_number: formData.rollNumber,
            year: formData.year,
            phone: formData.phone,
            email: formData.email,
            idea: formData.idea || null
          }
        ])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        setMessage({ type: 'error', text: error.message || 'Registration failed' });
      } else {
        setMessage({ type: 'success', text: 'Registration successful!' });
        // Navigate to ticket page after successful registration with data
        setTimeout(() => {
          navigate('/success', { 
            state: {
              fullName: formData.fullName,
              college: formData.college,
              department: formData.department,
              section: formData.section,
              rollNumber: formData.rollNumber,
              year: formData.year,
              phone: formData.phone,
              email: formData.email
            }
          });
        }, 1500);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };
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
          <form className="reg-form" onSubmit={handleSubmit}>
            {message.text && (
              <div className={`reg-message reg-message-${message.type}`}>
                {message.text}
              </div>
            )}

            {/* Section: Ticket Details */}
            <fieldset className="reg-fieldset">
              <legend>
                <span className="reg-legend-bar"></span>
                Ticket Details
              </legend>

              <div className="reg-field">
                <label htmlFor="fullName">Full Name</label>
                <input id="fullName" name="fullName" type="text" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} required />
              </div>

              <div className="reg-field">
                <label htmlFor="college">College Name</label>
                <input id="college" name="college" type="text" value="ISL ENGINEERING COLLEGE" readOnly required />
              </div>

              <div className="reg-row">
                <div className="reg-field">
                  <label htmlFor="dept">Department</label>
                  <select id="dept" name="department" value={formData.department} onChange={handleChange} required>
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
                  <select id="section" name="section" value={formData.section} onChange={handleChange}>
                    <option value="">Select Section</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                  </select>
                </div>
              </div>

              <div className="reg-row">
                <div className="reg-field">
                  <label htmlFor="roll">Roll Number</label>
                  <input id="roll" name="rollNumber" type="text" placeholder="Enter roll number" value={formData.rollNumber} onChange={handleChange} required />
                </div>
                <div className="reg-field">
                  <label htmlFor="year">Current Year</label>
                  <select id="year" name="year" value={formData.year} onChange={handleChange} required>
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
                <input id="phone" name="phone" type="tel" placeholder="Enter phone number" value={formData.phone} onChange={handleChange} required />
              </div>

              <div className="reg-field">
                <label htmlFor="email">Email ID</label>
                <input id="email" name="email" type="email" placeholder="example@gmail.com" value={formData.email} onChange={handleChange} required />
                <span className="reg-hint">This email will receive a copy of the e-ticket.</span>
              </div>
            </fieldset>

            {/* Section: Share Your Idea (Optional) */}
            <fieldset className="reg-fieldset">
              <legend>
                <span className="reg-legend-bar"></span>
                Share Your Idea <span style={{ fontSize: '12px', fontWeight: 'normal', color: '#a1a1b5' }}>(Optional)</span>
              </legend>

              <div className="reg-field">
                <label htmlFor="idea">Your Innovation Idea</label>
                <textarea 
                  id="idea" 
                  name="idea" 
                  rows="6"
                  placeholder="Share your innovative idea or project concept here... (Optional)"
                  value={formData.idea} 
                  onChange={handleIdeaChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    color: '#fff',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    minHeight: '120px'
                  }}
                />
                <span className="reg-hint">
                  {wordCount}/700 words {wordCount >= 700 && '(Maximum limit reached)'}
                </span>
              </div>
            </fieldset>

            {/* Submit */}
            <button type="submit" className="reg-submit" disabled={loading}>
              <span>{loading ? 'Submitting...' : 'Submit Registration'}</span>
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
        <p>Made by IIC INNOVATION TEAM WITH LOVE</p>
      </footer>
    </div>
  )
}

export default Register
