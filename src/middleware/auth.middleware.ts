import { type Request, type Response, type NextFunction } from 'express';
import { verifyToken } from '../../libs/jwt';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  (req as any).admin = decoded;
  return next();
};
