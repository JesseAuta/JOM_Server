import { Router } from 'express';
import {
  getBookings,
  createBooking,
  deleteBooking,
  updateBooking,
} from '../controllers/booking.controller';

const router = Router();

router.get('/', getBookings);
router.post('/', createBooking);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

export default router;
