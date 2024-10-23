import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Meal } from 'src/modules/meal';

@Table({ tableName: 'categories' })
export class Categories extends Model<Categories> {
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

  @HasMany(() => Meal)
  meals: Meal[];
  
}
