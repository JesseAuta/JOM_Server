import { Sequelize } from 'sequelize';

console.log('DB_URI =', process.env.DB_URI);

export const sequelize = new Sequelize(process.env.DB_URI as string);
