import { Router } from 'express';
import type { Request, Response } from 'express';
import { getBookedSlots } from '../services/availability.service';

const router = Router();

router.get('/availability', async (req: Request, res: Response) => {
  const { date } = req.query;
  if (!date || typeof date !== 'string') {
    res.status(400).json({ message: 'date query param is required' });
    return;
  }
  const bookedSlots = await getBookedSlots(date);
  res.json({ bookedSlots });
});

export default router;