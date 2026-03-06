
import { sequelize } from '../../libs/db';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
interface ServiceAttributes {
  id: number;
  name: string;
  price?: string | null;
  description?: string | null;
}

type ServiceCreationAttributes = Optional<ServiceAttributes, 'id' | 'price' | 'description'>;

export class Service
  extends Model<ServiceAttributes, ServiceCreationAttributes>
  implements ServiceAttributes
{
  public id!: number;
  public name!: string;
  public price!: string | null;
  public description!: string | null;
}

Service.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    tableName: 'services',
    timestamps: false,
    underscored: true,
  }
);