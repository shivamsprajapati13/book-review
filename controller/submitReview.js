const { connection } = require('../repository/connection');

async function submitReview(req, res) {
  const bookId = req.params.id;
  const userId = req.user.id;
  const { rating, comment } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  try {
    const checkQuery = 'SELECT 1 FROM reviews WHERE book_id = ? AND user_id = ?';
    connection.query(checkQuery, [bookId, userId], (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });

      if (results.length > 0) {
        return res.status(400).json({ error: 'You already reviewed this book' });
      }

      const insertQuery = `
        INSERT INTO reviews (book_id, user_id, rating, comment, created_at)
        VALUES (?, ?, ?, ?, NOW())
      `;
      connection.query(insertQuery, [bookId, userId, rating, comment], (err2) => {
        if (err2) return res.status(500).json({ error: 'Failed to submit review' });

        res.status(201).json({ message: 'Review submitted successfully' });
      });
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { submitReview };
