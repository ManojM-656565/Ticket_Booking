const mongoose = require('mongoose');
const Booking = require('../models/booking.model');
const Show = require('../models/show.model');

const createBooking = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.user._id;
    const { showId, seatsBooked, seatNumbers } = req.body;

    if (!showId) {
      return res.status(400).json({ message: 'Show ID is required' });
    }

    const show = await Show.findById(showId).session(session);
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }

    let seatsToBook = [];

    if (seatNumbers?.length) {
      const seatMap = new Map(show.seats.map(s => [s.seatNumber, s]));

      for (const sn of seatNumbers) {
        const seat = seatMap.get(sn);
        if (!seat) {
          return res.status(400).json({ message: `Seat ${sn} not found` });
        }
        if (seat.isBooked) {
          return res.status(400).json({ message: `Seat ${sn} is already booked` });
        }
        seatsToBook.push(seat);
      }
    } 
    else {
      const available = show.seats.filter(s => !s.isBooked);
      if (available.length < seatsBooked) {
        return res.status(400).json({ message: 'Not enough seats available' });
      }
      seatsToBook = available.slice(0, seatsBooked);
    }

    const totalAmount = seatsToBook.reduce((sum, s) => sum + (s.price || show.basePrice), 0);
    const seatNumbersToMark = seatsToBook.map(s => s.seatNumber);

    show.seats.forEach(s => {
      if (seatNumbersToMark.includes(s.seatNumber)) s.isBooked = true;
    });

    show.availableSeats -= seatsToBook.length;
    await show.save({ session });

    const [booking] = await Booking.create(
      [{
        userId,
        showId,
        seatsBooked: seatsToBook.length,
        seatNumbers: seatNumbersToMark,
        totalAmount,
        status: 'booked'
      }],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate({
        path: 'showId',
        populate: ['movieId', 'theatreId']
      });

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate({ path: 'showId', populate: ['movieId', 'theatreId'] });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getBookingById
};
