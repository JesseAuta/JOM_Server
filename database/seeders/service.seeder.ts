import { sequelize } from '../../libs/db';
import { Service } from '../../src/models/service.model'; 

export async function seedServices() {
  try {
   
    await sequelize.authenticate();
    console.log('Database connected');

  
    const services = [
      { name: 'Oil Change', price: '79.99', description: 'Complete oil and filter replacement' },
      { name: 'Brake Inspection', price: '49.99', description: 'Full brake system inspection' },
      { name: 'Engine Diagnostics', price: '99.99', description: 'Computerized engine diagnostics' },
      { name: 'Tire Replacement', price: '120.00', description: 'Tire removal and installation' },
      { name: 'Battery Replacement', price: '89.99', description: 'Battery replacement and testing' },
      { name: 'Air Conditioning Service', price: '75.00', description: 'AC system inspection and gas refill' },
      { name: 'Transmission Check', price: '150.00', description: 'Transmission diagnostics and inspection' },
      { name: 'Suspension Repair', price: '130.00', description: 'Shock absorber and suspension system repair' },
      { name: 'Wheel Alignment', price: '65.00', description: 'Wheel alignment adjustment' },
      { name: 'Full Vehicle Inspection', price: '110.00', description: 'Complete vehicle safety inspection' },
    ];

    await Service.bulkCreate(services);

    console.log('Services seeded successfully');
  } catch (error) {
    console.error('Service seeder error:', error);
  } finally {
  
    await sequelize.close();
    console.log('Database connection closed');
  }
}

seedServices();