const { connection } = require('../repository/connection');

async function getBookById(req, res) {
  const bookId = req.params.id;
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const query = `
    SELECT 
      b.id AS book_id,
      b.title,
      b.author,
      b.genre,
      b.created_at,
      (SELECT AVG(rating) FROM reviews WHERE book_id = b.id) AS average_rating,
      r.id AS review_id,
      r.user_id,
      r.rating,
      r.comment,
      r.created_at AS review_created_at
    FROM books b
    LEFT JOIN reviews r ON b.id = r.book_id
    WHERE b.id = ?
    ORDER BY r.created_at DESC
    LIMIT ? OFFSET ?
  `;

  const values = [bookId, Number(limit), Number(offset)];

  try {
    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Error fetching book details:', err);
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

module.exports = { getBookById };
