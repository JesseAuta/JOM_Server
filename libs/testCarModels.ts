// testCarModels.ts

import { CarModel } from '../src/models/carModel.model'; // path to CarModel
import { sequelize } from './db';

async function testModels() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    const models = await CarModel.findAll({ where: { brand_id: 2 } });
    console.log(models.map((m) => m.get())); // prints plain JS objects
  } catch (error) {
    console.error('Error fetching car models:', error);
  } finally {
    await sequelize.close();
    console.log('Database connection closed');
  }
}

testModels();
