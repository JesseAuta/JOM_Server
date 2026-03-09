import { sequelize } from '../../libs/db';
import { CarBrand } from '../../src/models/carBrand.model'; 

export async function seedCarBrands() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    const carBrands = [
      'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Toyota',
      'Ford', 'Opel', 'Renault', 'Peugeot', 'Hyundai',
      'Honda', 'Nissan', 'Mazda', 'Subaru', 'Kia',
      'Chevrolet', 'Dodge', 'Jeep', 'Land Rover', 'Jaguar',
      'Volvo', 'Mitsubishi', 'Suzuki', 'Fiat', 'Alfa Romeo',
      'Mini', 'Porsche', 'Bentley', 'Rolls-Royce', 'Ferrari',
      'Lamborghini', 'Maserati', 'Aston Martin', 'Tesla', 'Bugatti',
      'Cadillac', 'Lincoln', 'Infiniti', 'Acura', 'Chrysler',
      'Saab', 'Seat', 'Skoda', 'Citroen', 'Genesis',
      'Hummer', 'Pontiac', 'Buick', 'GMC', 'Ram'
    ];

    const data = carBrands.map(name => ({ name }));

    await CarBrand.bulkCreate(data);

    console.log('Car brands seeded successfully');

  } catch (error) {
    console.error('Car brand seeder error:', error);
  } finally {
    await sequelize.close();
    console.log('Database connection closed');
  }
}

seedCarBrands();