import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Admin } from '../models/admin.models';
import { generateToken } from '../../libs/jwt';

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const admin = await Admin.findOne({ where: { email } });

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
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      path: '/',
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

// LOGOUT
export const logoutAdmin = (req: Request, res: Response) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });

    return res.status(200).json({
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Logout error',
    });
  }
};
