import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import { Files } from "src/files/files.model";

interface TextBlockCreationAttr {
  searchTitle: string;
  text: string;
  group: string;
  image: string;
}

@Table({tableName: 'text_block'})
export class TextBlock extends Model<TextBlock, TextBlockCreationAttr> {

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  searchTitle: string;

  @Column({type: DataType.STRING})
  title: string;

  @Column({type: DataType.STRING, allowNull: false})
  text: string;

  @Column({type: DataType.STRING, allowNull: false})
  group: string;
  
  @HasOne(() => Files)
  image: Files;
  
}