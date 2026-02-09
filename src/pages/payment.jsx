import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import '../payment.css';

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const registrationData = location.state;
  const [selectedMethod, setSelectedMethod] = useState('');

  const UPI_ID = 'taru29@ibl';
  const AMOUNT = '20';
  const NAME = 'IIC Event Registration';

  const handlePayment = (method) => {
    setSelectedMethod(method);
    let paymentUrl = '';

    if (method === 'phonepe') {
      paymentUrl = `phonepe://pay?pa=${UPI_ID}&pn=${encodeURIComponent(NAME)}&am=${AMOUNT}&cu=INR`;
    } else if (method === 'googlepay') {
      paymentUrl = `gpay://upi/pay?pa=${UPI_ID}&pn=${encodeURIComponent(NAME)}&am=${AMOUNT}&cu=INR`;
    } else if (method === 'upi') {
      paymentUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(NAME)}&am=${AMOUNT}&cu=INR`;
    }

    window.location.href = paymentUrl;
  };

  return (
    <div className="payment-page">
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="grid-overlay"></div>
        <div className="noise-overlay"></div>
      </div>

      <main className="payment-container">
        <div className="payment-ticket">
          <div className="payment-header">
            <div className="payment-badge">Entry Ticket Payment</div>
            <h1 className="payment-title">DO THE PAYMENT OF ₹20 FOR ENTRY TICKET</h1>
            <p className="payment-subtitle">R&D Orientation Program 2026</p>
          </div>

          <div className="payment-amount-box">
            <span className="amount-label">Registration Fee</span>
            <span className="amount-value">₹20</span>
          </div>

          <div className="payment-methods">
            <h2 className="methods-title">Select Payment Method</h2>
            
            <button 
              className={`pay-btn phonepe-btn ${selectedMethod === 'phonepe' ? 'active' : ''}`}
              onClick={() => handlePayment('phonepe')}
            >
              <img src="/images.png" alt="PhonePe" className="pay-icon" />
              <div className="pay-content">
                <span className="pay-name">PhonePe</span>
                <span className="pay-desc">Pay using PhonePe app</span>
              </div>
            </button>

            <button 
              className={`pay-btn gpay-btn ${selectedMethod === 'googlepay' ? 'active' : ''}`}
              onClick={() => handlePayment('googlepay')}
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" className="pay-icon" />
              <div className="pay-content">
                <span className="pay-name">Google Pay</span>
                <span className="pay-desc">Pay using Google Pay app</span>
              </div>
            </button>

            <button 
              className={`pay-btn upi-btn ${selectedMethod === 'upi' ? 'active' : ''}`}
              onClick={() => handlePayment('upi')}
            >
              <div className="pay-icon-text">UPI</div>
              <div className="pay-content">
                <span className="pay-name">Any UPI App</span>
                <span className="pay-desc">Pay using any UPI application</span>
              </div>
            </button>
          </div>

          <div className="payment-footer">
            <div className="secure-info">
              <span className="secure-icon">🔒</span>
              <p>Secure payment to UPI ID: <strong>taru29@ibl</strong></p>
            </div>
            <p className="confirmation-text">You'll receive confirmation via email after successful payment</p>
          </div>

          <button className="back-btn" onClick={() => navigate('/register')}>
            ← Back to Registration
          </button>
        </div>
      </main>
    </div>
  );
}

export default Payment;
