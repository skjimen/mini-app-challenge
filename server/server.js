const express = require('express');
const app = express();
const { Pool } = require('pg');

// Create a new pool instance for connecting to the PostgreSQL database
const pool = new Pool({
  user: 'skjimen',
  host: 'localhost',
  database: 'movies',
  password: '',
  port: 5432,
});

// GET route for retrieving the list of movies
app.get('/movies', async (req, res) => {
  try {
    // Query the database for the movies
    const result = await pool.query('SELECT title FROM movies');
    const movies = result.rows.map((row) => row.title);

    // Send the movies as a response
    res.json(movies);
  } catch (error) {
    console.error('Error retrieving movies:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
