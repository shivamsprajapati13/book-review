const { connection } = require('../repository/connection');

async function getAllBooks(req, res) {
  const { page = 1, limit = 10, author, genre } = req.query;
  const offset = (page - 1) * limit;

  let filters = [];
  let values = [];

  if (author) {
    filters.push(`author LIKE ?`);
    values.push(`%${author}%`);
  }

  if (genre) {
    filters.push(`genre LIKE ?`);
    values.push(`%${genre}%`);
  }

  const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';

  const query = `
    SELECT * FROM books
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  values.push(Number(limit), Number(offset));

  try {
    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Error fetching books:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      res.json({
        page: Number(page),
        limit: Number(limit),
        data: results,
      });
    });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { getAllBooks };
