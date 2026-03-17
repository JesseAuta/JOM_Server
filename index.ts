import express, {
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './src/routes/auth.routes';
import bookingRoutes from './src/routes/booking.routes';
import servicesRoutes from './src/routes/service.routes';
import mechanicsRoutes from './src/routes/mechanics.routes';
import bookingBlockRoutes from './src/routes/booking-block.routes';
import carRoutes from './src/routes/car.routes';

import session from 'express-session';
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
app.use(cookieParser());
app.use('/admin', authRoutes);
app.use('/admin/bookings', bookingRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/mechanics', mechanicsRoutes);
app.use('/admin/booking-blocks', bookingBlockRoutes);
app.use('/api/cars', carRoutes);


app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
  }),
);

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

const port = 8000;

try {
  await sequelize.authenticate();
  console.log('db connected');
} catch (error) {
  console.log(error);
}
await sequelize.sync({ alter: true });

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

    await sequelize.sync({ alter: true });
    console.log('Models synced');

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to DB:', error);
  }
};

startServer();
