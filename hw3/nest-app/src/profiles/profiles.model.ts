import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Gender } from "./../enums/gender";
import { User } from "./../users/users.model";

interface ProfileCreationAttr {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: Gender;
  userId: number;
}

@Table({tableName: 'profile'})
export class Profile extends Model<Profile, ProfileCreationAttr> {

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, allowNull: false})
  firstName: string;

  @Column({type: DataType.STRING, allowNull: false})
  lastName: string;

  @Column({type: DataType.ENUM(Gender.male, Gender.female), allowNull: false})
  gender: Gender;

  @Column({type: DataType.STRING})
  phoneNumber: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, allowNull: false})
  userId: number;
}