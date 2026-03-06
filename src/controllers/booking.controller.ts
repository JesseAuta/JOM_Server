import type { Request, Response } from 'express';
import { createAppointmentService, getAllAppointmentsService, getAppointmentByIdService, deleteAppointmentService } from '../services/booking.service';

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const appointment = await createAppointmentService(req.body);
    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error creating appointment', error });
  }
};

export const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await getAllAppointmentsService();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};

export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const appointment = await getAppointmentByIdService(Number(req.params.id));
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointment', error });
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const deleted = await deleteAppointmentService(Number(req.params.id));
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment', error });
  }
};
