import { Router, type Request, type Response } from 'express';
import { isAdmin } from '../middleware/isAdmin.middleware';

const router = Router();

// GET /admin/check → only works if admin is logged in
router.get('/check', isAdmin, (req: Request, res: Response) => {
  // We can also return admin info if needed
  res.status(200).json({
    message: 'Admin authenticated',
    admin: (req as any).admin,
  });
});

export default router;
