const { connection } = require('../repository/connection');

async function deleteReview(req, res) {
  const reviewId = req.params.id;
  const userId = req.user.id; 

  const query = `DELETE FROM reviews WHERE id = ? AND user_id = ?`;

  connection.query(query, [reviewId, userId], (err, result) => {
    if (err) {
      console.error('Delete review error:', err);
      return res.status(500).json({ error: 'Failed to delete review' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Review not found or not authorized' });
    }

    res.json({ message: 'Review deleted successfully' });
  });
}

module.exports = { deleteReview };
