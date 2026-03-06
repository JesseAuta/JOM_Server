import * as bcrypt from 'bcrypt';
import { Admin } from '../models/admin.models';

export const createAdmin = async (payload: { email: string; password: string }) => {
  const hashed = await bcrypt.hash(payload.password, 10);
  return Admin.create({ email: payload.email, password: hashed });
};

export const findAdminByEmail = async (email: string) => {
  return Admin.findOne({ where: { email } });
};

export const verifyAdminCredentials = async (email: string, password: string) => {
  const admin = await findAdminByEmail(email);
  if (!admin) return null;
  const ok = await bcrypt.compare(password, admin.password);
  return ok ? admin : null;
};