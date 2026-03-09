import { sequelize } from '../../libs/db';
import { CarBrand } from '../../src/models/carBrand.model'; 
import { CarModel } from '../../src/models/carModel.model'; 

export async function seedCarModels() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    const brands = await CarBrand.findAll();
    if (!brands.length) {
      throw new Error('No car brands found. Seed car brands first.');
    }

    const modelsData: { brandName: string; models: string[] }[] = [
      { brandName: 'BMW', models: ['3 Series', '5 Series', 'X3', 'X5'] },
      { brandName: 'Mercedes-Benz', models: ['C-Class', 'E-Class', 'GLA', 'GLE'] },
      { brandName: 'Audi', models: ['A3', 'A4', 'A6', 'Q5'] },
      { brandName: 'Volkswagen', models: ['Golf', 'Passat', 'Tiguan', 'Polo'] },
      { brandName: 'Toyota', models: ['Corolla', 'Camry', 'RAV4', 'Yaris'] },
      { brandName: 'Ford', models: ['Focus', 'Mustang', 'Explorer', 'Fiesta'] },
      { brandName: 'Opel', models: ['Astra', 'Corsa', 'Insignia', 'Mokka'] },
      { brandName: 'Renault', models: ['Clio', 'Megane', 'Captur', 'Kadjar'] },
      { brandName: 'Peugeot', models: ['208', '308', '3008', '5008'] },
      { brandName: 'Hyundai', models: ['i10', 'i20', 'i30', 'Tucson'] },
    ];

    const carModels: { brand_id: number; name: string }[] = [];

    for (const entry of modelsData) {
      const brand = brands.find(b => b.name === entry.brandName);
      if (!brand) {
        console.warn(`Brand not found: ${entry.brandName}, skipping models`);
        continue;
      }

      entry.models.forEach(modelName => {
        carModels.push({
          brand_id: brand.id,
          name: modelName,
        });
      });
    }

    if (carModels.length === 0) {
      throw new Error('No car models to insert. Check brand names.');
    }

    await CarModel.bulkCreate(carModels);
    console.log('Car models seeded successfully');

  } catch (error) {
    console.error('Car model seeder error:', error);
  } finally {
    await sequelize.close();
    console.log('Database connection closed');
  }
}

seedCarModels();