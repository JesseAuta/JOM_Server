import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import { sequelize } from '../../libs/db';
import { CarBrand } from './carBrand.models';

interface CarModelAttributes {
  id: number;
  brand_id: number;
  name: string;
}

type CarModelCreationAttributes = Optional<CarModelAttributes, 'id'>;

export class CarModel extends Model<
  CarModelAttributes,
  CarModelCreationAttributes
> {
  declare id: number;
  declare brand_id: number;
  declare name: string;

  declare brandData?: CarBrand;
}

CarModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    brand_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: 'car_models',
    timestamps: false,
    underscored: true,
  },
);

CarModel.belongsTo(CarBrand, {
  foreignKey: 'brand_id',
  as: 'brandData',
});
