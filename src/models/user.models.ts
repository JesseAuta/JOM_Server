import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import { sequelize } from '../../libs/db';

interface AdminAttributes {
  id: number;
  email: string;
  password: string;
  refresh_token?: string | null;
}

type AdminCreationAttributes = Optional<AdminAttributes, 'id' | 'refresh_token'>;

export class Admin
  extends Model<AdminAttributes, AdminCreationAttributes>
  implements AdminAttributes
{
  public id!: number;
  public email!: string;
  public password!: string;
  public refresh_token!: string | null;
}

Admin.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.TEXT, allowNull: false },
    refresh_token: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    tableName: 'admins',
    timestamps: false,
    underscored: true,
  }
);