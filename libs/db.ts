//import { Sequelize } from 'sequelize';

//console.log('DB_URI =', process.env.DB_URI);

//export const sequelize = new Sequelize(process.env.DB_URI as string);

const { Sequelize } = require('sequelize');

export const sequelize = new Sequelize(process.env.DB_URI, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false  // needed for Render's self-signed cert
    }
  }
});