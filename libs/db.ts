import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize (process.env.DB_URI || "postgres://user:pass@example.com:5432/dbname")