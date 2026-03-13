import { Router } from 'express';
import { loginAdmin, logoutAdmin } from '../controllers/auth.controllers';
import { isAdmin } from '../middleware/auth.middleware';

const authRoutes = Router();

authRoutes.route('/login').post(loginAdmin);
authRoutes.route('/dashboard').get(isAdmin, (req, res) => {
  res.json({ message: 'Welcome to admin dashboard' });
});
authRoutes.post('/logout', logoutAdmin);

export default authRoutes;
