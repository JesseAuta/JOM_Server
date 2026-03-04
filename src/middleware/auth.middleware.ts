import { type Request, type Response, type NextFunction } from 'express';

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (req.session?.admin) {
    return next();
  }
  res.status(401).json({ message: 'Not authorized' });
};
