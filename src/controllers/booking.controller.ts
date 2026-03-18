import { type Request, type Response } from 'express';
import { Booking } from '../models/booking.models';

export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.findAll({
      order: [
        ['booking_date', 'ASC'],
        ['booking_time', 'ASC'],
      ],
    });

    return res.status(200).json(bookings);
  } catch (error) {
    console.error('Get bookings error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      address,
      car_model_id,
      mechanic_id,
      car_year,
      service_id,
      booking_date,
      booking_time,
      pickup_required,
      delivery_required,
      notes,
      numberplate,
    } = req.body;

    if (!first_name || !last_name || !phone || !booking_date || !booking_time) {
      return res.status(400).json({
        message:
          'first_name, last_name, phone, booking_date and booking_time are required',
      });
    }

    const booking = await Booking.create({
      first_name,
      last_name,
      email,
      phone,
      address,
      car_model_id,
      mechanic_id,
      car_year,
      service_id,
      booking_date,
      booking_time,
      pickup_required,
      delivery_required,
      notes,
      numberplate,
    });

    return res.status(201).json(booking);
  } catch (error) {
    console.error('Create booking error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid booking id' });
    }

    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await booking.destroy();

    return res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Delete booking error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
