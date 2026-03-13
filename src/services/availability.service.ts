import { Booking } from '../models/booking.models';

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
