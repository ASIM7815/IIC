import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../payment.css';

function Failed() {
  const navigate = useNavigate();
  const location = useLocation();
  const registrationData = location.state;

  useEffect(() => {
    const updatePaymentStatus = async () => {
      if (registrationData?.email) {
        await supabase
          .from('registrations')
          .update({ 
            payment_status: 'failed',
            payment_id: `FAIL_${Date.now()}`
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
        <div className="payment-ticket failed-card">
          <div className="failed-icon">❌</div>
          <h1 className="failed-title">Payment Failed</h1>
          <p className="failed-message">Your payment could not be processed</p>
          <div className="failed-details">
            <p><strong>Amount:</strong> ₹1</p>
            <p><strong>Status:</strong> Failed</p>
          </div>
          <button className="back-btn" onClick={() => navigate('/payment', { state: registrationData })}>
            Try Again
          </button>
        </div>
      </main>
    </div>
  );
}

export default Failed;
