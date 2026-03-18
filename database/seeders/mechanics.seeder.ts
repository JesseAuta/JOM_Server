
import { Mechanic } from '../../src/models/mechanic.model';

export default async function seedMechanic () {
  const mechanics = [
    { first_name: 'John', last_name: 'Doe', specialization: 'Engine' },
    { first_name: 'Jane', last_name: 'Smith', specialization: 'Brakes' },
  ];

  await Mechanic.bulkCreate(mechanics);
  console.log('Mechanic seeded');
}