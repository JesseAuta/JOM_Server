import { Router } from 'express';
import {
   createAppointmentService,
     getAllAppointmentsService,
  getAppointmentByIdService,
  deleteAppointmentService,
 } from '../services/booking.service';
const router = Router();
router.post('/', createAppointmentService);
router.get('/', getAllAppointmentsService);
router.get('/:id', getAppointmentByIdService);
router.delete('/:id', deleteAppointmentService);
export default router;
