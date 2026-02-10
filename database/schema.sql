-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  college VARCHAR(255) NOT NULL,
  department VARCHAR(100) NOT NULL,
  section VARCHAR(10),
  roll_number VARCHAR(100) NOT NULL,
  year VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  idea TEXT,
  payment_status VARCHAR(20) DEFAULT 'pending',
  payment_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_created_at ON registrations(created_at DESC);
CREATE INDEX idx_email ON registrations(email);
