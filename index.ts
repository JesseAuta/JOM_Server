import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './libs/db';
import cookieParser from 'cookie-parser';
import authRoutes from './src/routes/auth.routes';

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

app.use(express.json());

// Routes
app.use('/api/admin', authRoutes);

// Test route
app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

// Start server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

    await sequelize.sync({ alter: true });
    console.log('Models synced');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to DB:', error);
  }
};

startServer();
