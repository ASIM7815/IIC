-- Migration: Add idea column to registrations table
-- Run this if you already have the registrations table created

ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS idea TEXT;

-- Add comment to the column
COMMENT ON COLUMN registrations.idea IS 'Optional innovation idea submission from students (max 700 words)';
