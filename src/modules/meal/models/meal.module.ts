import { Column, Model, Table, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from 'src/modules/user';
import { Categories } from 'src/modules/categories';
import { Receipt } from 'src/modules/recept';

@Table({ tableName: 'meal' })
export class Meal extends Model<Meal> {
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
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    type: DataType.STRING,
  })
  image: string;

  @Column({
    type: DataType.TEXT,
  })
  video: string;

  // ForeignKey to Categories
  @ForeignKey(() => Categories)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  category_id: string;

  // ForeignKey to User
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: string;

  // Relation to User model
  @BelongsTo(() => User)
  user: User;

  // Relation to Categories model
  @BelongsTo(() => Categories)
  category: Categories;

  // HasMany relation to Receipt model
  @HasMany(() => Receipt)
  receipts: Receipt[];


}
