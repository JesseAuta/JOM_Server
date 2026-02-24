import express from 'express';
import { sequelize } from './libs/db';

const app = express();
const PORT = process.env.PORT || 3000;

try {
  await sequelize.authenticate() // Test connection
  console.log("Connection has been established successfully.")
} catch (error) {
  console.error("Unable to connect to the database:", error)
  process.exit(1)
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

