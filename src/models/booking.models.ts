
import { sequelize } from '../../libs/db';
import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
interface AppointmentAttributes {
  id: number;
  first_name: string;
  last_name: string;
  email?: string | null;
  phone: string;
  address?: string | null;
  car_model_id?: number | null;
  mechanic_id?: number | null;
  car_year?: number | null;
  service_id?: number | null;
  appointment_date: string;
  appointment_time: string;
  pickup_required?: boolean;
  delivery_required?: boolean;
  notes?: string | null;
}

type AppointmentCreationAttributes = Optional<
  AppointmentAttributes,
  | 'id'
  | 'email'
  | 'address'
  | 'car_model_id'
  | 'mechanic_id'
  | 'car_year'
  | 'service_id'
  | 'pickup_required'
  | 'delivery_required'
  | 'notes'
>;

export class Appointment
  extends Model<AppointmentAttributes, AppointmentCreationAttributes>
  implements AppointmentAttributes
{
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string | null;
  public phone!: string;
  public address!: string | null;
  public car_model_id!: number | null;
  public mechanic_id!: number | null;
  public car_year!: number | null;
  public service_id!: number | null;
  public appointment_date!: string;
  public appointment_time!: string;
  public pickup_required!: boolean;
  public delivery_required!: boolean;
  public notes!: string | null;
}

Appointment.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.TEXT, allowNull: true },
    car_model_id: { type: DataTypes.INTEGER, allowNull: true },
    mechanic_id: { type: DataTypes.INTEGER, allowNull: true },
    car_year: { type: DataTypes.INTEGER, allowNull: true },
    service_id: { type: DataTypes.INTEGER, allowNull: true },
    appointment_date: { type: DataTypes.DATEONLY, allowNull: false },
    appointment_time: { type: DataTypes.TIME, allowNull: false },
    pickup_required: { type: DataTypes.BOOLEAN, defaultValue: false },
    delivery_required: { type: DataTypes.BOOLEAN, defaultValue: false },
    notes: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    tableName: 'appointments',
    timestamps: false,
    underscored: true,
  }
);
