import { sequelize } from '../../libs/db';
import { seedAdmins }from './admin.seeder';
import { seedCarBrands } from './carbrand.seeder';
import {  seedCarModels } from './carmodel.seeder';
import {seedServices } from './service.seeder';
import { seedBooking} from './booking.seeder';
import seedMechanic from './mechanics.seeder';

async function seedAll() {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

    await seedAdmins();
    await seedMechanic();
    await seedCarBrands();
    await seedCarModels();
    await seedServices();
    await seedBooking();

    console.log('All seeders executed successfully');

  } catch (err) {
    console.error('SeedAll error:', err);
  } finally {
    await sequelize.close();
    console.log('DB connection closed');
  }
}

seedAll();