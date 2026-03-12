import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import { sequelize } from '../../libs/db';

interface BookingBlockAttributes {
  id: number;
  block_date: string;
  block_time?: string | null;
  reason: string;
  created_at?: Date;
}

type BookingBlockCreationAttributes = Optional<
  BookingBlockAttributes,
  'id' | 'block_time' | 'created_at'
>;

export class BookingBlock
  extends Model<BookingBlockAttributes, BookingBlockCreationAttributes>
  implements BookingBlockAttributes
{
  public id!: number;
  public block_date!: string;
  public block_time!: string | null;
  public reason!: string;
  public created_at!: Date;
}

BookingBlock.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    block_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    block_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'booking_blocks',
    timestamps: false,
    underscored: true,
  },
);
