# Razorpay Payment Setup

## Steps to Enable Real Payments:

### 1. Create Razorpay Account
- Go to https://razorpay.com/
- Sign up for a free account
- Complete KYC verification

### 2. Get API Keys
- Login to Razorpay Dashboard
- Go to Settings → API Keys
- Generate Test/Live Keys
- Copy Key ID and Key Secret

### 3. Add Environment Variables
Add these to your `.env` file:
```
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_key
```

### 4. Add to Vercel
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Add all three Razorpay variables

### 5. Update Database
Run this SQL in your Supabase SQL Editor:
```sql
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS payment_status VARCHAR(20) DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS payment_id VARCHAR(255);
```

### 6. Test Payment
- Use Razorpay test cards: https://razorpay.com/docs/payments/payments/test-card-details/
- Test Card: 4111 1111 1111 1111
- CVV: Any 3 digits
- Expiry: Any future date

## How It Works:
1. User clicks "Pay ₹1 Now"
2. Razorpay checkout opens
3. User completes payment (UPI/Card/NetBanking)
4. Payment verified automatically
5. Database updated with success/failed status
6. User redirected to success/failed page
