import { DataTypes, Model, type Optional } from 'sequelize';
import { sequelize } from '../../libs/db';

interface BookingAttributes {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  phone: string;
  address?: string;
  car_model_id?: number;
  mechanic_id?: number;
  car_year?: number;
  service_id?: number;
  appointment_date: string;
  appointment_time: string;
  pickup_required?: boolean;
  delivery_required?: boolean;
  notes?: string;
  created_at?: Date;
}

interface BookingCreationAttributes extends Optional<
  BookingAttributes,
  'id' | 'created_at'
> {}

class Booking
  extends Model<BookingAttributes, BookingCreationAttributes>
  implements BookingAttributes
{
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public email?: string;
  public phone!: string;
  public address?: string;
  public car_model_id?: number;
  public mechanic_id?: number;
  public car_year?: number;
  public service_id?: number;
  public appointment_date!: string;
  public appointment_time!: string;
  public pickup_required?: boolean;
  public delivery_required?: boolean;
  public notes?: string;
  public created_at?: Date;
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    address: {
      type: DataTypes.TEXT,
    },

    car_model_id: {
      type: DataTypes.INTEGER,
    },

    mechanic_id: {
      type: DataTypes.INTEGER,
    },

    car_year: {
      type: DataTypes.INTEGER,
    },

    service_id: {
      type: DataTypes.INTEGER,
    },

    appointment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    appointment_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    pickup_required: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    delivery_required: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    notes: {
      type: DataTypes.TEXT,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'appointments',
    timestamps: false,
  },
);

export { Booking };