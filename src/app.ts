


import express from 'express';
import carRoutes from './routes/car.routes';
import authRoutes from './routes/auth.routes';
import bookingRoutes from './routes/booking.routes';
import bookingBlockRoutes from './routes/booking-block.routes';
import mechanicsRoutes from './routes/mechanics.routes';
import serviceRoutes from './routes/service.routes';
import publicRoutes from './routes/public.routes';

const app = express();

app.use(express.json());

app.use('/api/cars', carRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/booking-blocks', bookingBlockRoutes);
app.use('/api/mechanics', mechanicsRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/public', publicRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

export default app;