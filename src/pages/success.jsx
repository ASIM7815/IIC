import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../payment.css';

function Success() {
  const navigate = useNavigate();
  const location = useLocation();
  const registrationData = location.state;

  useEffect(() => {
    const updatePaymentStatus = async () => {
      if (registrationData?.email) {
        await supabase
          .from('registrations')
          .update({ 
            payment_status: 'success',
            payment_id: `PAY_${Date.now()}`
          })
          .eq('email', registrationData.email);
      }
    };
    updatePaymentStatus();
  }, [registrationData]);

  return (
    <div className="payment-page">
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      <main className="payment-container">
        <div className="payment-ticket success-card">
          <div className="success-icon">🎉</div>
          <h1 className="success-title">Congratulations!</h1>
          <p className="success-message">Your payment was successful</p>
          <div className="success-details">
            <p><strong>Amount Paid:</strong> ₹1</p>
            <p><strong>Status:</strong> Success</p>
          </div>
          <button className="back-btn" onClick={() => navigate('/')}>
            Go to Home
          </button>
        </div>
      </main>
    </div>
  );
}

export default Success;
