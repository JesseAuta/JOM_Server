import jwt from 'jsonwebtoken';
import { Admin } from '../src/models/admin.models';
import * as bcrypt from 'bcrypt';
import {type Request, Response } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ where: { email } });

  if (!admin) return res.status(404).json({ message: 'Admin not found' });

  const validPassword = await bcrypt.compare(password, admin.password);
  if (!validPassword)
    return res.status(401).json({ message: 'Incorrect password' });

  // Generate JWT
  const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ message: 'Login successful', token });
};
