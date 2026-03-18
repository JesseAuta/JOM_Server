import { Booking } from '../models/booking.models';
import { Op } from 'sequelize';

export const isSlotAvailable = async (
  appointment_date: string,
  appointment_time: string,
  mechanic_id?: number,
) => {
  const where: any = { appointment_date, appointment_time };
  if (typeof mechanic_id !== 'undefined') where.mechanic_id = mechanic_id;
  const conflict = await Booking.findOne({ where });
  return conflict === null;
};

export const findConflicts = async (
  booking_date: string,
  booking_time: string,
) => {
  return Booking.findAll({ where: { booking_date, booking_time } });
};


// NEW
export const getBookedSlots = async (date: string): Promise<string[]> => {
  const bookings = await Booking.findAll({
    where: {
      booking_date: date,
    },
    attributes: ['booking_time'],
  });
  return bookings.map((b) => b.booking_time.slice(0, 5)); // returns ['09:00', '10:00', ...]
};