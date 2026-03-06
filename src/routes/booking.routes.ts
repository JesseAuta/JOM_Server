import { Router } from 'express';
import { createAppointment, getAllAppointments, getAppointmentById, deleteAppointment } from '../controllers/booking.controller';
const router = Router();
router.post('/', createAppointment);
router.get('/', getAllAppointments);
router.get('/:id', getAppointmentById);
router.delete('/:id', deleteAppointment);
export default router;
