import bcrypt from 'bcrypt';
import { sequelize } from '../../libs/db';
import { Admin } from '../../src/models/admin.models';

async function createAdmin() {
  try {
    await sequelize.authenticate();

    const existing = await Admin.findOne();

    if (existing) {
      console.log('❌ Admin already exists');
      return;
    }

    const hash = await bcrypt.hash('Admin123', 10);

    await Admin.create({
      email: 'admin@jomauto.com',
      password: hash,
    });

    console.log('✅ Admin created successfully');
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}

createAdmin();
