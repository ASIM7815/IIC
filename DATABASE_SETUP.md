# PostgreSQL Database Setup for Registration Form

## Setup Instructions

### 1. Install Dependencies
```bash
npm install pg
```

### 2. Choose a PostgreSQL Provider

#### Option A: Vercel Postgres (Recommended)
1. Go to your Vercel project dashboard
2. Navigate to Storage tab
3. Create a new Postgres database
4. Copy the `POSTGRES_URL` connection string
5. Add it to your environment variables

#### Option B: Supabase
1. Go to https://supabase.com
2. Create a new project
3. Go to Project Settings > Database
4. Copy the connection string (URI format)
5. Replace `[YOUR-PASSWORD]` with your database password

#### Option C: Railway/Render/Other
1. Create a PostgreSQL database on your preferred platform
2. Get the connection string
3. Add it to environment variables

### 3. Set Environment Variables

Create a `.env` file in the root directory:
```
POSTGRES_URL=your_postgres_connection_string_here
```

For Vercel deployment, add the environment variable in:
- Vercel Dashboard > Your Project > Settings > Environment Variables

### 4. Create Database Table

Run the SQL commands from `database/schema.sql` in your PostgreSQL database:

```sql
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
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_created_at ON registrations(created_at DESC);
CREATE INDEX idx_email ON registrations(email);
```

You can run this:
- In Supabase: SQL Editor
- In Vercel Postgres: Query tab
- Using any PostgreSQL client (pgAdmin, DBeaver, etc.)

### 5. Deploy to Vercel

```bash
npm run build
vercel --prod
```

### 6. View Registration Data

#### Supabase:
- Go to Table Editor in your Supabase dashboard
- Select `registrations` table

#### Vercel Postgres:
- Go to Storage > Your Database > Data tab

#### Using SQL Query:
```sql
SELECT * FROM registrations ORDER BY created_at DESC;
```

## API Endpoint

The registration form submits to: `/api/register`

This serverless function:
- Validates all required fields
- Inserts data into PostgreSQL
- Returns success/error response
- Automatically adds timestamp

## Database Schema

| Column      | Type         | Description                    |
|-------------|--------------|--------------------------------|
| id          | SERIAL       | Auto-increment primary key     |
| full_name   | VARCHAR(255) | Student's full name            |
| college     | VARCHAR(255) | College name (fixed)           |
| department  | VARCHAR(100) | Department (CSE, ECE, etc.)    |
| section     | VARCHAR(10)  | Section (A, B, C, D)           |
| roll_number | VARCHAR(100) | Student roll number            |
| year        | VARCHAR(50)  | Current year (1st-4th)         |
| phone       | VARCHAR(20)  | Phone number                   |
| email       | VARCHAR(255) | Email (unique)                 |
| created_at  | TIMESTAMP    | Registration timestamp         |

## Testing Locally

1. Install dependencies: `npm install`
2. Set up `.env` file with `POSTGRES_URL`
3. Run development server: `npm run dev`
4. Test the registration form at `http://localhost:5173/register`

## Troubleshooting

- **Connection Error**: Check if `POSTGRES_URL` is correctly set
- **Table Not Found**: Run the schema.sql commands
- **Duplicate Email**: Email must be unique per registration
- **CORS Issues**: Vercel serverless functions handle CORS automatically
