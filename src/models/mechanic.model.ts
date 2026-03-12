import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import { sequelize } from '../../libs/db';

interface MechanicAttributes {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  specialization?: string | null;
  created_at?: Date;
}

type MechanicCreationAttributes = Optional<
  MechanicAttributes,
  'id' | 'specialization' | 'created_at'
>;

export class Mechanic
  extends Model<MechanicAttributes, MechanicCreationAttributes>
  implements MechanicAttributes
{
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public phone!: string;
  public specialization!: string | null;
  public created_at!: Date;
}

Mechanic.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    specialization: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'mechanics',
    timestamps: false,
    underscored: true,
  },
);
