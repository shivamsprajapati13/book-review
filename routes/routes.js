const express = require('express');
const { registerUser } = require('../controller/register');
const { loginUser } = require('../controller/login');
const authenticateToken = require('../service/authentication');
const { addBook } = require('../controller/addBook');
const { getAllBooks } = require('../controller/getAllBooks');
const { getBookById } = require('../controller/getBooksById');
const { submitReview } = require('../controller/submitReview');
const { updateReview } = require('../controller/updateReview');
const { deleteReview } = require('../controller/deleteReview');
const { searchBooks } = require('../controller/searchBook.js');

const router = express.Router();

router.post('/registerUser', registerUser);
router.post('/login', loginUser);
router.post('/addbook', authenticateToken,addBook);
router.get('/getAllBooks', authenticateToken, getAllBooks)
router.get('/getBookById/:id',authenticateToken, getBookById);
router.post('/submitReviewById/:id', authenticateToken, submitReview);
router.put('/updateReviewById/:id', authenticateToken, updateReview);
router.delete('/deleteReviewById/:id', authenticateToken, deleteReview);
router.get('/search',authenticateToken,searchBooks);


module.exports = router;