import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fullName, college, department, section, rollNumber, year, phone, email } = req.body;

  // Validation
  if (!fullName || !college || !department || !rollNumber || !year || !phone || !email) {
    return res.status(400).json({ error: 'All required fields must be filled' });
  }

  try {
    const query = `
      INSERT INTO registrations (full_name, college, department, section, roll_number, year, phone, email, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
      RETURNING *
    `;
    
    const values = [fullName, college, department, section, rollNumber, year, phone, email];
    const result = await pool.query(query, values);

    return res.status(201).json({ 
      success: true, 
      message: 'Registration successful!',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
}
