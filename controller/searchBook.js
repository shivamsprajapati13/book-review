const { connection } = require('../repository/connection');

async function searchBooks(req, res) {
  const { query } = req.query;

  if (!query || query.trim() === '') {
    return res.status(400).json({ error: 'Search query is required' });
  }

  const searchQuery = `%${query}%`;

  const sql = `
    SELECT * FROM books
    WHERE LOWER(title) LIKE LOWER(?) OR LOWER(author) LIKE LOWER(?)
    ORDER BY created_at DESC
  `;

  connection.query(sql, [searchQuery, searchQuery], (err, results) => {
    if (err) {
      console.error('Search error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json({ results });
  });
}

module.exports = { searchBooks };
