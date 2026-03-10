import { type Request, type Response } from 'express';
import {Booking} from '../models/booking.models';
export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
