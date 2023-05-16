import { BelongsToMany, Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import { Profile } from "./../profiles/profiles.model";
import { Role } from "./../roles/roles.model";
import { UserRoles } from "./../roles/user-roles.model";

interface UserCreationAttr {
  email: string;
  password: string;
}

@Table({tableName: 'user'})
export class User extends Model<User, UserCreationAttr> {

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasOne(() => Profile)
  profile: Profile;
}