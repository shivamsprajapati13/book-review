const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { connection } = require('../repository/connection');

async function loginUser(req, res) {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const query = 'SELECT * FROM users WHERE username = ?';

    connection.query(query, [userName], async (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      const user = results[0];

  
      if (!user.password) {
        console.error('Password field missing in DB record for user:', user);
        return res.status(500).json({ error: 'Internal user data error' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ message: 'Login successful', token });
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { loginUser };
