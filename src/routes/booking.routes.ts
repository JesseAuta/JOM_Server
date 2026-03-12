import { Router } from 'express';
import {
  createAppointmentService,
  getAllAppointmentsService,
  getAppointmentByIdService,
  deleteAppointmentService,
} from '../services/booking.service';

import {
  getBookings,
  createBooking,
  deleteBooking,
} from '../controllers/booking.controller';

const router = Router();
router.post('/', createAppointmentService);
router.get('/', getAllAppointmentsService);
router.get('/:id', getAppointmentByIdService);
router.delete('/:id', deleteAppointmentService);

router.get('/', getBookings);
router.post('/', createBooking);
router.delete('/:id', deleteBooking);

export default router;
