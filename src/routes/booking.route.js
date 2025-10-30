const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const {
  createBooking,
  getUserBookings,
  getBookingById,
} = require('../controllers/booking.controller');

router.post('/createBooking', auth, createBooking);
router.get('/', auth, getUserBookings);
router.get('/:id', auth, getBookingById);

module.exports = router;
