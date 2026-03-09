import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Admin } from '../models/admin.models';
import { generateToken } from '../../libs/jwt';

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    console.log('LOGIN EMAIL:', email);

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const admin = await Admin.findOne({ where: { email } });

    console.log('ADMIN FOUND:', !!admin);

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const hashedPassword = admin.getDataValue('password');

    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // CREATE JWT
    const token = generateToken({
      id: admin.id,
      email: admin.email,
    });

    // SET COOKIE
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: 'Login successful',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
