import { sequelize } from '../../libs/db';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';

interface CarBrandAttributes {
  id: number;
  name: string;
}

type CarBrandCreationAttributes = Optional<CarBrandAttributes, 'id'>;

export class CarBrand
  extends Model<CarBrandAttributes, CarBrandCreationAttributes>
  implements CarBrandAttributes
{
  public id!: number;
  public name!: string;
}

CarBrand.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    tableName: 'car_brands',
    timestamps: false,
    underscored: true,
  },
);
