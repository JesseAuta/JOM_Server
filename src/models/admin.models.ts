// src/models/admin.models.ts
import { DataTypes, Model, type Optional } from 'sequelize';
import { sequelize } from '../../libs/db';

// Attributes
interface AdminAttributes {
  id: number;
  email: string;
  password: string;
  refresh_token?: string | null;
}

// For creation (id is optional because it auto-increments)
interface AdminCreationAttributes extends Optional<
  AdminAttributes,
  'id' | 'refresh_token'
> {}

// Model
export class Admin
  extends Model<AdminAttributes, AdminCreationAttributes>
  implements AdminAttributes
{
  public id!: number;
  public email!: string;
  public password!: string;
  public refresh_token!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize
Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'admins',
    timestamps: true,
    updatedAt: false,
    underscored: true,
  },
);
