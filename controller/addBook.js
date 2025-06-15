
const { connection } = require('../repository/connection');

async function addBook(req, res) {
  const { title, author, published_year,genre } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const userId = req.user.id;
  

  const query = `
    INSERT INTO books (title, author, published_year, user_id,created_at,genre)
    VALUES (?, ?, ?, ?,NOW(), ?)
  `;

  try {
    connection.query(query, [title, author, published_year, userId,genre], (err, results) => {
      if (err) {
        console.error('Add book error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      res.status(201).json({ message: 'Book added successfully', bookId: results.insertId });
    });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { addBook };
