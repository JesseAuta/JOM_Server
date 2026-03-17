// import { DataTypes, Model } from 'sequelize';
// import type { Optional } from 'sequelize';
// import { sequelize } from '../../libs/db';
// import { CarBrand } from './carBrand.model';

// interface CarModelAttributes {
//   id: number;
//   brand_id: number;
//   name: string;
// }

// type CarModelCreationAttributes = Optional<CarModelAttributes, 'id'>;

// export class CarModel
//   extends Model<CarModelAttributes, CarModelCreationAttributes>
//   implements CarModelAttributes
// {
//   public id!: number;
//   public brand_id!: number;
//   public name!: string;
// }

// CarModel.init(
//   {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     brand_id: { type: DataTypes.INTEGER, allowNull: false },
//     name: { type: DataTypes.STRING, allowNull: false },
//   },
//   {
//     sequelize,
//     tableName: 'car_models',
//     timestamps: false,
//     underscored: true,
//   }
// );

// CarModel.belongsTo(CarBrand, { foreignKey: 'brand_id' });
// CarBrand.hasMany(CarModel, { foreignKey: 'brand_id' });

import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import { sequelize } from '../../libs/db';
import { CarBrand } from './carBrand.model';

interface CarModelAttributes {
  id: number;
  brand_id: number;
  name: string;
}

type CarModelCreationAttributes = Optional<CarModelAttributes, 'id'>;

export class CarModel extends Model<
  CarModelAttributes,
  CarModelCreationAttributes
> {}

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

// Define associations
CarModel.belongsTo(CarBrand, { foreignKey: 'brand_id' });
CarBrand.hasMany(CarModel, { foreignKey: 'brand_id' });
