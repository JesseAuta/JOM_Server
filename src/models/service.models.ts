import { sequelize } from '../../libs/db';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import { Mechanic } from './mechanic.models';

interface ServiceAttributes {
  id: number;
  name: string;
  price?: string | null;
  description?: string | null;
  mechanic_id?: number | null;
  visible?: boolean;
}

type ServiceCreationAttributes = Optional<
  ServiceAttributes,
  'id' | 'price' | 'description' | 'mechanic_id' | 'visible'
>;

export class Service
  extends Model<ServiceAttributes, ServiceCreationAttributes>
  implements ServiceAttributes
{
  declare id: number;
  declare name: string;
  declare price: string | null;
  declare description: string | null;
  declare mechanic_id: number | null;

  declare mechanicData?: Mechanic;
}

Service.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    mechanic_id: { type: DataTypes.INTEGER, allowNull: true },
    visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'services',
    timestamps: false,
    underscored: true,
  },
);

Service.belongsTo(Mechanic, {
  foreignKey: 'mechanic_id',
  as: 'mechanicData',
});
