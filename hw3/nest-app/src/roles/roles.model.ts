import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "./../users/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttr {
  value: string;
  description: string;
}

@Table({tableName: 'role'})
export class Role extends Model<Role, RoleCreationAttr> {

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  value: string;

  @Column({type: DataType.STRING, allowNull: false})
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}