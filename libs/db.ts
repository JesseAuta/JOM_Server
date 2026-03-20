const { Sequelize } = require('sequelize');

export let sequelize;

if (process.env.NODE_ENV === 'production') {
    sequelize = new Sequelize(process.env.DB_URI as string, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false  // needed for Render's self-signed cert
            }
        }
    });
} else {
    sequelize = new Sequelize(process.env.DB_URI as string);

}