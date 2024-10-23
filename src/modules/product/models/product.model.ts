import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Receipt } from '../../recept/models';

@Table({ tableName: 'product' })
export class Product extends Model<Product> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  image: string;

  @HasMany(() => Receipt)
  receipts: Receipt[];
}
