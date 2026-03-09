import { Booking } from '../models/booking.models';

export const createAppointmentService = async (data: any) => {
  return await Booking.create(data);
};

export const getAllAppointmentsService = async () => {
  return await Booking.findAll();
};

 export const getAppointmentByIdService = async (id: number) => {
 return await Booking.findByPk(id);
};

export const updateAppointmentService = async (id: number, data: any) => {
  const appointment = await Booking.findByPk(id);
  if (!appointment) return null;
  await appointment.update(data);
  return appointment;
};

 export const deleteAppointmentService = async (id: number) => {
  const appointment = await Booking.findByPk(id);
 if (!appointment) return null;
  await appointment.destroy();
 return appointment;
};
