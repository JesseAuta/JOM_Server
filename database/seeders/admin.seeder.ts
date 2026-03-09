import { sequelize } from '../../libs/db';
import { Admin } from '../../src/models/admin.models';

export async function seedAdmins() {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

    const admins = [
      { email: 'admin@jomauto.com', password: 'Admin123' },
      { email: 'superadmin@jomauto.com', password: 'Admin321' },
    ];

    await Admin.bulkCreate(admins);
    console.log('Admins seeded');

  } catch (err) {
    console.error('Admin seeder error:', err);
  } finally {
    await sequelize.close();
  }
}

seedAdmins();