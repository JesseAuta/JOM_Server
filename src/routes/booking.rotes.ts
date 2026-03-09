import { Router } from 'express';
import { isAdmin } from '../middleware/auth.middleware';
import { getBookings } from '../controllers/booking.controller';

const router = Router();

router.get('/', isAdmin, getBookings);

export default router;
