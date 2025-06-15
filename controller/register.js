const bcrypt = require('bcrypt');
const { connection } = require('../repository/connection') 
async function registerUser(req, res) {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
  
    const rows = await connection.query(
      'SELECT id FROM users WHERE username = ?',
      [userName]
    );

    if (rows.length > 0) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await connection.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [userName, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { registerUser };
