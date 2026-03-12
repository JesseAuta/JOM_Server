import { Router } from 'express';
import {
  getBookingBlocks,
  createBookingBlock,
  deleteBookingBlock,
} from '../controllers/booking-block.controller';

const router = Router();

router.get('/', getBookingBlocks);
router.post('/', createBookingBlock);
router.delete('/:id', deleteBookingBlock);

export default router;
