const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 3001; // Port for the backend server

// IMPORTANT: Use environment variables for credentials in a real production environment
const dbConfig = {
  host: 'localhost',
  user: 'pay_mojib',
  password: 'Mojib.Com89',
  database: 'pay_mojib',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

app.use(cors()); // Allow requests from your frontend
app.use(express.json()); // To parse JSON bodies

// Create a connection pool instead of a single connection
const pool = mysql.createPool(dbConfig);

// Test the database connection on startup
pool.getConnection()
  .then(connection => {
    console.log('Successfully connected to the database.');
    connection.release();
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
  });


// --- API Endpoints ---

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    // Assuming a 'commentsGenerated' column exists in your 'users' table
    const [rows] = await pool.execute('SELECT id, name, captionsGenerated, commentsGenerated, status FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    res.status(500).json({ error: 'Failed to fetch users from database.' });
  }
});

// Get templates
app.get('/api/templates', async (req, res) => {
    try {
      const [rows] = await pool.execute('SELECT id, name, prompt, category FROM templates');
      res.json(rows);
    } catch (error) {
      console.error('Failed to fetch templates:', error);
      res.status(500).json({ error: 'Failed to fetch templates.' });
    }
});

// Add new template
app.post('/api/templates', async (req, res) => {
    const { name, prompt, category } = req.body;
    if (!name || !prompt || !category) {
        return res.status(400).json({ error: 'Missing required fields for template.' });
    }
    const id = `t${Date.now()}`;
    try {
        await pool.execute('INSERT INTO templates (id, name, prompt, category) VALUES (?, ?, ?, ?)', [id, name, prompt, category]);
        res.status(201).json({ id, name, prompt, category });
    } catch (error) {
        console.error('Failed to add template:', error);
        res.status(500).json({ error: 'Failed to add template.' });
    }
});

// Delete template
app.delete('/api/templates/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.execute('DELETE FROM templates WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Template not found.' });
        }
        res.status(200).json({ message: 'Template deleted successfully.' });
    } catch (error) {
        console.error('Failed to delete template:', error);
        res.status(500).json({ error: 'Failed to delete template.' });
    }
});

// Get blacklist
app.get('/api/blacklist', async (req, res) => {
    try {
      const [rows] = await pool.execute('SELECT username FROM blacklist');
      res.json(rows.map(r => r.username));
    } catch (error) {
      console.error('Failed to fetch blacklist:', error);
      res.status(500).json({ error: 'Failed to fetch blacklist.' });
    }
});

// Add to blacklist
app.post('/api/blacklist', async (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ error: 'Username is required.' });
    }
    try {
        // Use INSERT IGNORE to prevent errors if the user is already blacklisted
        await pool.execute('INSERT IGNORE INTO blacklist (username) VALUES (?)', [username]);
        // Update the user's status in the `users` table
        await pool.execute("UPDATE users SET status = 'Banned' WHERE name = ?", [username]);
        res.status(201).json({ message: 'User blocked successfully.' });
    } catch (error) {
        console.error('Failed to block user:', error);
        res.status(500).json({ error: 'Failed to block user.' });
    }
});

// Remove from blacklist
app.delete('/api/blacklist/:username', async (req, res) => {
    const { username } = req.params;
    try {
        await pool.execute('DELETE FROM blacklist WHERE username = ?', [username]);
        // Update user status back to active
        await pool.execute("UPDATE users SET status = 'Active' WHERE name = ?", [username]);
        res.status(200).json({ message: 'User unblocked successfully.' });
    } catch (error) {
        console.error('Failed to unblock user:', error);
        res.status(500).json({ error: 'Failed to unblock user.' });
    }
});


app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});