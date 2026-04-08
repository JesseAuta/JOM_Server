// import { type Request, type Response } from 'express';
// import { Booking } from '../models/booking.models';
// import { sendEmail } from '../services/email';

// export const getBookings = async (req: Request, res: Response) => {
//   try {
//     const bookings = await Booking.findAll({
//       order: [
//         ['booking_date', 'ASC'],
//         ['booking_time', 'ASC'],
//       ],
//     });

//     return res.status(200).json(bookings);
//   } catch (error) {
//     console.error('Get bookings error:', error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };

// export const createBooking = async (req: Request, res: Response) => {
//   try {
//     const {
//       first_name,
//       last_name,
//       email,
//       phone,
//       address,
//       car_model_id,
//       mechanic_id,
//       car_year,
//       service_id,
//       booking_date,
//       booking_time,
//       pickup_required,
//       delivery_required,
//       notes,
//       numberplate,
//     } = req.body;

//     if (!first_name || !last_name || !phone || !booking_date || !booking_time) {
//       return res.status(400).json({
//         message:
//           'first_name, last_name, phone, booking_date and booking_time are required',
//       });
//     }

//     const booking = await Booking.create({
//       first_name,
//       last_name,
//       email,
//       phone,
//       address,
//       car_model_id,
//       mechanic_id,
//       car_year,
//       service_id,
//       booking_date,
//       booking_time,
//       pickup_required,
//       delivery_required,
//       notes,
//       numberplate,
//     });

//     if (email) {
//       await sendEmail(email, first_name, booking_date, booking_time);
//     }

//     return res.status(201).json(booking);
//   } catch (error) {
//     console.error('Create booking error:', error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };

// export const deleteBooking = async (req: Request, res: Response) => {
//   try {
//     const id = Number(req.params.id);

//     if (isNaN(id)) {
//       return res.status(400).json({ message: 'Invalid booking id' });
//     }

//     const booking = await Booking.findByPk(id);

//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }

//     await booking.destroy();

//     return res.status(200).json({ message: 'Booking deleted successfully' });
//   } catch (error) {
//     console.error('Delete booking error:', error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };

import { type Request, type Response } from 'express';
import { Booking } from '../models/booking.models';
import { CarModel } from '../models/carModel.models';
import { CarBrand } from '../models/carBrand.models';
import { Service } from '../models/service.models';
import { Mechanic } from '../models/mechanic.models';
import { sendEmail } from '../services/email';

type Status = 'new' | 'in_progress' | 'done';

const mapBookingForFrontend = (booking: any) => ({
  id: booking.id,
  numberPlate: booking.numberplate || '',
  carBrand: booking.carModelData?.brandData?.name || '',
  carModel: booking.carModelData?.name || '',
  name: booking.first_name || '',
  lastName: booking.last_name || '',
  email: booking.email || '',
  year: booking.car_year ? String(booking.car_year) : '',
  address: booking.address || '',
  telephone: booking.phone || '',
  pickup: Boolean(booking.pickup_required),
  delivery: Boolean(booking.delivery_required),
  service: booking.serviceData?.name || '',
  date: booking.booking_date || '',
  time: booking.booking_time ? String(booking.booking_time).slice(0, 5) : '',
  mechanic: booking.mechanicData?.name || '',
  status: 'new' as Status,
  note: booking.notes || '',
});

export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        {
          model: CarModel,
          as: 'carModelData',
          include: [
            {
              model: CarBrand,
              as: 'brandData',
            },
          ],
        },
        {
          model: Service,
          as: 'serviceData',
        },
        {
          model: Mechanic,
          as: 'mechanicData',
        },
      ],
      order: [
        ['booking_date', 'ASC'],
        ['booking_time', 'ASC'],
      ],
    });

    return res.status(200).json(bookings.map(mapBookingForFrontend));
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

    const service = service_id ? await Service.findByPk(service_id) : null;

    const booking = await Booking.create({
      first_name,
      last_name,
      email,
      phone,
      address,
      car_model_id,
      mechanic_id: mechanic_id || service?.mechanic_id || null,
      car_year,
      service_id,
      booking_date,
      booking_time,
      pickup_required,
      delivery_required,
      notes,
      numberplate,
    });

    const createdBooking = await Booking.findByPk(booking.id, {
      include: [
        {
          model: CarModel,
          as: 'carModelData',
          include: [
            {
              model: CarBrand,
              as: 'brandData',
            },
          ],
        },
        {
          model: Service,
          as: 'serviceData',
        },
        {
          model: Mechanic,
          as: 'mechanicData',
        },
      ],
    });

    if (email) {
      await sendEmail(email, first_name, booking_date, booking_time);
    }

    return res.status(201).json(mapBookingForFrontend(createdBooking));
  } catch (error) {
    console.error('Create booking error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid booking id' });
    }

    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const { date, time, note } = req.body;

    if (date) {
      booking.booking_date = date;
    }

    if (time) {
      booking.booking_time = time;
    }

    booking.notes = note || null;

    await booking.save();

    const updatedBooking = await Booking.findByPk(id, {
      include: [
        {
          model: CarModel,
          as: 'carModelData',
          include: [
            {
              model: CarBrand,
              as: 'brandData',
            },
          ],
        },
        {
          model: Service,
          as: 'serviceData',
        },
        {
          model: Mechanic,
          as: 'mechanicData',
        },
      ],
    });

    return res.status(200).json(mapBookingForFrontend(updatedBooking));
  } catch (error) {
    console.error('Update booking error:', error);
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
