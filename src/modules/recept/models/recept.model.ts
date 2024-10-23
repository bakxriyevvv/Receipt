import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Meal } from 'src/modules/meal';
import { Product } from 'src/modules/product';

@Table({ tableName: 'receipt' })
export class Receipt extends Model<Receipt> {
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id: number;

  @ForeignKey(() => Meal)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  meal_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  quantity: string;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => Meal)
  meal: Meal;
}
