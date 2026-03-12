import { type Request, type Response } from 'express';
import { BookingBlock } from '../models/booking-block.model';

export const getBookingBlocks = async (req: Request, res: Response) => {
  try {
    const blocks = await BookingBlock.findAll({
      order: [
        ['block_date', 'ASC'],
        ['block_time', 'ASC'],
      ],
    });

    return res.status(200).json(blocks);
  } catch (error) {
    console.error('Get booking blocks error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createBookingBlock = async (req: Request, res: Response) => {
  try {
    const { block_date, block_time, reason } = req.body;

    if (!block_date || !reason) {
      return res.status(400).json({
        message: 'block_date and reason are required',
      });
    }

    const block = await BookingBlock.create({
      block_date,
      block_time: block_time || null,
      reason,
    });

    return res.status(201).json(block);
  } catch (error) {
    console.error('Create booking block error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteBookingBlock = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid block id' });
    }

    const block = await BookingBlock.findByPk(id);

    if (!block) {
      return res.status(404).json({ message: 'Block not found' });
    }

    await block.destroy();

    return res.status(200).json({ message: 'Block deleted successfully' });
  } catch (error) {
    console.error('Delete booking block error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
