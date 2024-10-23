import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Meal } from '../../meal';

export enum UserRoles {
  user = 'USER',
  admin = 'ADMIN',
}

@Table({ tableName: 'user' })
export class User extends Model<User> {
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
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  image: string;

  @Column({
    type: DataType.STRING,
  })
  telegram_id: string;

  @Column({
    type: DataType.ENUM,
    values: [UserRoles.admin, UserRoles.user],
    allowNull: false,
    defaultValue: UserRoles.user,
  })
  role: UserRoles;

  @HasMany(() => Meal)
  meals: Meal[];
}
