import { Router } from 'express';
import { loginAdmin } from '../controllers/auth.controllers';
import { isAdmin } from '../middleware/auth.middleware';

const authRoutes = Router();

authRoutes.route('/login').post(loginAdmin);
authRoutes.route('/dashboard').get(isAdmin, (req, res) => {
  res.json({ message: 'Welcome to admin dashboard' });
});
export default authRoutes;

export const config = {
  matcher: ['/dashboard/:path*', '/bookings/:path*', '/settings/:path*'],
};
