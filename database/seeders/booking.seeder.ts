import { sequelize } from '../../libs/db';
import { Booking } from '../../src/models/booking.models';

export async function seedBooking() {
  
}

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

    await sequelize.sync();

    const bookings = [
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone: '1234567890',
        address: '123 Main St',
        car_brand_id: 3,
        car_model_id: 1,
        mechanic_id: 1,
        car_year: 2020,
        service_id: 1,
        appointment_date: '2025-04-25',
        appointment_time: '10:00',
        pickup_required: true,
        delivery_required: false,
        notes: 'Customer prefers synthetic oil',
      },
      {
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane@example.com',
        phone: '0987654321',
        address: '456 Oak Ave',
        car_brand_id: 2,
        car_model_id: 2,
        mechanic_id: 2,
        car_year: 2019,
        service_id: 2,
        appointment_date: '2025-04-26',
        appointment_time: '12:00',
        pickup_required: false,
        delivery_required: true,
        notes: 'Check brakes',
      },
    ];

    await Booking.bulkCreate(bookings);

   console.log('Test bookings added');

} catch (err) {

  console.error('Seeder error:', err);

} finally {

  await sequelize.close();
  console.log('Database connection closed');

}
}

seed();