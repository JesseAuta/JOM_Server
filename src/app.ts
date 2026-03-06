import express from 'express';
import carRoutes from './routes/car.routes';

const app = express();

app.use(express.json());

app.use('/api/cars', carRoutes);

export default app;