import { type Request, type Response } from 'express';
import * as bcrypt from 'bcrypt';
import { Admin } from '../models/admin.models';

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword)
      return res.status(401).json({ message: 'Incorrect password' });

    res.status(200).json({ message: 'Login successful', adminId: admin.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
