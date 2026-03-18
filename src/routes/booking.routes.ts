import { Router } from 'express';
import {
  getBookings,
  createBooking,
  deleteBooking,
} from '../controllers/booking.controller';

const router = Router();

router.get('/', getBookings);
router.post('/', createBooking);
router.delete('/:id', deleteBooking);

export default router;