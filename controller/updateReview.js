const { connection } = require('../repository/connection');

async function updateReview(req, res) {
  const reviewId = req.params.id;
  const userId = req.user.id;
  const { rating, comment } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  try {
    const checkQuery = 'SELECT * FROM reviews WHERE id = ? AND user_id = ?';
    connection.query(checkQuery, [reviewId, userId], (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (results.length === 0) {
        return res.status(403).json({ error: 'You can only update your own review' });
      }

      const updateQuery = `
        UPDATE reviews
        SET rating = ?, comment = ?, created_at = NOW()
        WHERE id = ? AND user_id = ?
      `;
      connection.query(updateQuery, [rating, comment, reviewId, userId], (err2) => {
        if (err2) return res.status(500).json({ error: 'Failed to update review' });

        res.json({ message: 'Review updated successfully' });
      });
    });
  } catch (err) {
    console.error('Error updating review:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { updateReview };
