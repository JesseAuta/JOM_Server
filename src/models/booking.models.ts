import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import { sequelize } from '../../libs/db';

interface BookingAttributes {
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
  booking_date: string;
  booking_time: string;
  pickup_required?: boolean;
  delivery_required?: boolean;
  notes?: string | null;
  created_at?: Date;
}

type BookingCreationAttributes = Optional<
  BookingAttributes,
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
  | 'created_at'
>;

export class Booking
  extends Model<BookingAttributes, BookingCreationAttributes>
  implements BookingAttributes
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
  public booking_date!: string;
  public booking_time!: string;
  public pickup_required!: boolean;
  public delivery_required!: boolean;
  public notes!: string | null;
  public created_at!: Date;
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    car_model_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    mechanic_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    car_year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    booking_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    booking_time: {
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
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'bookings',
    timestamps: false,
    underscored: true,
  },
);
