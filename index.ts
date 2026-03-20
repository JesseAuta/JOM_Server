import express, {
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { sequelize } from './libs/db';

// Routes
import publicRoutes from './src/routes/public.routes';
import authRoutes from './src/routes/auth.routes';
import bookingRoutes from './src/routes/booking.routes';
import servicesRoutes from './src/routes/service.routes';
import mechanicsRoutes from './src/routes/mechanics.routes';
import bookingBlockRoutes from './src/routes/booking-block.routes';
import carRoutes from './src/routes/car.routes';
import checkRoutes from './src/routes/check.routes';

// Middleware
import { isAdmin } from './src/middleware/isAdmin.middleware';

dotenv.config();

const app = express();
const port = 8000;


app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defualt_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production", httpOnly: true, sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", maxAge: 1000 * 60 * 60 * 24, },
  }),
);

// Public routes (accessible to everyone)
app.use('/api/public', publicRoutes);

// Admin login route (public)
app.use('/admin', authRoutes);
app.use('/admin', checkRoutes);

// Protected admin routes
app.use('/admin/bookings', isAdmin, bookingRoutes);
app.use('/admin/booking-blocks', isAdmin, bookingBlockRoutes);
app.use('/admin/mechanics', isAdmin, mechanicsRoutes);

// Optional: protect admin APIs
app.use('/api/services', servicesRoutes);
app.use('/api/mechanics', isAdmin, mechanicsRoutes);

// Public APIs
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

// Start server
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
