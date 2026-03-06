import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';

import authRoutes from './src/routes/auth.routes';
import serviceRoutes from './src/routes/service.routes';
import carRoutes from './src/routes/car.routes';
import bookingRoutes from './src/routes/booking.routes';
import { sequelize } from './libs/db';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }, // local dev
  }),
);

app.use('/admin', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/appointments', bookingRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

const PORT = Number(process.env.PORT) || 3000;

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